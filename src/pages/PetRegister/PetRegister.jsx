import { useState } from 'react';
import { ArrowLeft, Heart, CheckCircle2, AlertCircle, Upload, PawPrint, Info } from 'lucide-react';
import style from './PetRegister.module.css';

export const PetRegister = () => {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: 'MALE',           
    size: 'MEDIUM',        
    status: 'AVAILABLE',
    description: '',       
    shelterId: '1',        
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const STATUS_OPTIONS = [
    { value: 'AVAILABLE', label: 'Disponible', icon: '✓' },
    { value: 'ADOPTED', label: 'Adoptado', icon: '♥' },
    { value: 'PENDING', label: 'Pendiente', icon: '⏳' }
  ];

  const SPECIES_OPTIONS = ['Perro', 'Gato', 'Conejo', 'Ave', 'Otro'];
  const SEX_OPTIONS = [
    { value: 'MALE', label: 'Macho' },
    { value: 'FEMALE', label: 'Hembra' }
  ];
  const SIZE_OPTIONS = [
    { value: 'SMALL', label: 'Pequeño' },
    { value: 'MEDIUM', label: 'Mediano' },
    { value: 'LARGE', label: 'Grande' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newErrors = {};

      if (!petData.name.trim()) newErrors.name = 'El nombre es obligatorio';
      if (!petData.species) newErrors.species = 'La especie es obligatoria';
      if (!petData.breed.trim()) newErrors.breed = 'La raza es obligatoria';
      
      if (!petData.age) {
        newErrors.age = 'La edad es obligatoria';
      } else if (Number(petData.age) < 0) {
        newErrors.age = 'La edad debe ser un número positivo';
      }

      if (!petData.shelterId) newErrors.shelterId = 'El ID del refugio es obligatorio';

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        throw new Error('VALIDATION_FAILED');
      }

      const response = await fetch('http://localhost:8080/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: petData.name,
          species: petData.species.toUpperCase(), 
          breed: petData.breed,
          age: Math.floor(Number(petData.age)),
          sex: petData.sex,
          size: petData.size,
          temperament: petData.description || 'Amigable', 
          specialNeeds: 'Ninguna',
          arrivalHistory: 'Ingreso al refugio',
          status: petData.status,
          shelter: {
            id: petData.shelterId ? Number(petData.shelterId) : 1
          }
        })
      });

      if (response.ok) {
        alert('¡Registro Exitoso!\nLa mascota ha sido guardada correctamente en el sistema.');

        setIsSuccess(true);
        
        setPetData({
          name: '',
          species: '',
          breed: '',
          age: '',
          sex: 'MALE',
          size: 'MEDIUM',
          status: 'AVAILABLE',
          description: '',
          shelterId: '1',
          image: null
        });
        setImagePreview(null);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        console.error(`Error del servidor: Código ${response.status}`);
        alert(`Error ${response.status}: El servidor rechazó la solicitud. Por favor, verifica los datos e intenta nuevamente.`);
      }

    } catch (error) {
      if (error.message === 'VALIDATION_FAILED') {
        console.warn('El formulario contiene errores de validación local.');
      } else {
        console.error('Error de red o fallo inesperado:', error);
        alert('Error de conexión con el servidor.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.pageLayout}>
      <header className={style.headerNav}>
        <div className={style.headerContainer}>
          <button onClick={() => window.history.back()} className={style.backBtn}>
            <ArrowLeft size={18} />
            <span>Volver</span>
          </button>
          <div className={style.brandTitle}>
            <div className={style.brandIcon}>
              <PawPrint size={20} color="#ffffff" />
            </div>
            <h2>Registro de Mascota</h2>
          </div>
          <div style={{ width: '80px' }}></div>
        </div>
      </header>

      <main className={style.mainContent}>
        <div className={style.gridContainer}>
          <div className={style.cardContainer}>
            <div className={style.cardHeader}>
              <div className={style.headerDecorator}>
                <Heart size={24} color="#ffffff" />
              </div>
              <div>
                <h3>Nueva Mascota</h3>
                <p>Completa los datos alineados con el sistema central</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={style.formBody}>
              {isSuccess && (
                <div className={style.successAlert}>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>¡Mascota registrada exitosamente!</strong>
                    <p>La información se guardó correctamente en el PetDTO.</p>
                  </div>
                </div>
              )}

              <div className={style.fieldGroup}>
                <label className={style.inputLabel}>Foto de la mascota</label>
                <div className={style.uploadWrapper}>
                  {imagePreview ? (
                    <div className={style.previewBox}>
                      <img src={imagePreview} alt="Preview" className={style.previewImg} />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setPetData(prev => ({ ...prev, image: null }));
                        }}
                        className={style.removeImgBtn}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className={style.dropzoneLabel}>
                      <Upload size={32} />
                      <p className={style.uploadText}>
                        <strong>Click para subir</strong> o arrastra aquí
                      </p>
                      <p className={style.uploadSubtext}>PNG, JPG (MAX. 5MB)</p>
                      <input
                        type="file"
                        className={style.hiddenInput}
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className={style.formRow}>
                <div className={style.formColumn}>
                  <label htmlFor="name" className={style.inputLabel}>
                    Nombre <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={petData.name}
                    onChange={handleChange}
                    className={errors.name ? style.inputError : style.textInput}
                    placeholder="Ej: Max"
                  />
                  {errors.name && (
                    <div className={style.errorMessage}>
                      <AlertCircle size={14} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="species" className={style.inputLabel}>
                    Especie <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <select
                    id="species"
                    name="species"
                    value={petData.species}
                    onChange={handleChange}
                    className={errors.species ? style.inputError : style.selectInput}
                  >
                    <option value="">Selecciona una especie</option>
                    {SPECIES_OPTIONS.map(species => (
                      <option key={species} value={species}>{species}</option>
                    ))}
                  </select>
                  {errors.species && (
                    <div className={style.errorMessage}>
                      <AlertCircle size={14} />
                      <span>{errors.species}</span>
                    </div>
                  )}
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="breed" className={style.inputLabel}>
                    Raza <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={petData.breed}
                    onChange={handleChange}
                    className={errors.breed ? style.inputError : style.textInput}
                    placeholder="Ej: Golden Retriever"
                  />
                  {errors.breed && (
                    <div className={style.errorMessage}>
                      <AlertCircle size={14} />
                      <span>{errors.breed}</span>
                    </div>
                  )}
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="age" className={style.inputLabel}>
                    Edad (años) <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="0"
                    step="1"
                    value={petData.age}
                    onChange={handleChange}
                    className={errors.age ? style.inputError : style.textInput}
                    placeholder="Ej: 2"
                  />
                  {errors.age && (
                    <div className={style.errorMessage}>
                      <AlertCircle size={14} />
                      <span>{errors.age}</span>
                    </div>
                  )}
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="sex" className={style.inputLabel}>
                    Sexo <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={petData.sex}
                    onChange={handleChange}
                    className={style.selectInput}
                  >
                    {SEX_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="size" className={style.inputLabel}>
                    Tamaño <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={petData.size}
                    onChange={handleChange}
                    className={style.selectInput}
                  >
                    {SIZE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className={style.formColumn}>
                  <label htmlFor="shelterId" className={style.inputLabel}>
                    ID del Refugio Asociado <span className={style.requiredAsterisk}>*</span>
                  </label>
                  <input
                    type="number"
                    id="shelterId"
                    name="shelterId"
                    min="1"
                    value={petData.shelterId}
                    onChange={handleChange}
                    className={errors.shelterId ? style.inputError : style.textInput}
                    placeholder="Ej: 1"
                  />
                  {errors.shelterId && (
                    <div className={style.errorMessage}>
                      <AlertCircle size={14} />
                      <span>{errors.shelterId}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={style.fieldGroup}>
                <label className={style.inputLabel}>
                  Estado <span className={style.requiredAsterisk}>*</span>
                </label>
                <div className={style.statusGrid}>
                  {STATUS_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPetData(prev => ({ ...prev, status: option.value }));
                        if (errors.status) setErrors(prev => ({ ...prev, status: '' }));
                      }}
                      className={petData.status === option.value ? style.statusBtnActive : style.statusBtn}
                    >
                      <span className={style.statusIcon}>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={style.fieldGroup}>
                <label htmlFor="description" className={style.inputLabel}>
                  Temperamento / Descripción (opcional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={petData.description}
                  onChange={handleChange}
                  rows={4}
                  className={style.textareaInput}
                  placeholder="Ej: Muy juguetón, activo y cariñoso..."
                />
              </div>

              <button type="submit" className={style.submitBtn}>
                <PawPrint size={18} />
                <span>Registrar Mascota</span>
              </button>
            </form>
          </div>

          <div className={style.sidebarSection}>
            <div className={style.stickySidebar}>
              <div className={style.tipsCard}>
                <div className={style.tipsHeader}>
                  <div className={style.tipsIconBox}>
                    <Info size={16} color="#ffffff" />
                  </div>
                  <h4>Consejos</h4>
                </div>
                <ul className={style.tipsList}>
                  <li>Asegúrate de incluir una foto clara de la mascota</li>
                  <li>Proporciona información precisa sobre la edad y raza</li>
                  <li>Describe su personalidad en la descripción</li>
                  <li>Marca como "Disponible" si está lista para adopción</li>
                </ul>
              </div>

              <div className={style.statsCard}>
                <h4 className={style.statsTitle}>Mascotas Registradas</h4>
                <div className={style.statsContainer}>
                  <div className={style.statBox}>
                    <p className={style.statLabel}>Disponibles</p>
                    <p className={style.statNumberGreen}>45</p>
                  </div>
                  <div className={style.statBox}>
                    <p className={style.statLabel}>Adoptadas</p>
                    <p className={style.statNumberBlue}>128</p>
                  </div>
                  <div className={style.statBox}>
                    <p className={style.statLabel}>Pendientes</p>
                    <p className={style.statNumberOrange}>12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};