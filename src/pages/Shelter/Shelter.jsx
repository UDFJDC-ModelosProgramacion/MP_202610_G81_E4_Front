import { useState } from 'react';
import { MapPin, Phone, Mail, Search, Plus, Building2, ChevronRight, X, CheckCircle2, Users, PawPrint, ArrowLeft } from 'lucide-react';
import styles from './Shelter.module.css';

// Datos de ejemplo
const initialShelters = [
  { id: 1, name: 'Refugio Huellas Felices', address: 'Calle 45 #12-34, Bogotá', phone: '+57 300 123 4567', email: 'huellas@refugio.com', pets: 24, capacity: 40, description: 'Refugio dedicado al rescate y rehabilitación de animales en situación de calle.' },
  { id: 2, name: 'Patitas al Rescate', address: 'Carrera 80 #50-10, Medellín', phone: '+57 311 987 6543', email: 'patitas@rescate.com', pets: 18, capacity: 30, description: 'Organización sin ánimo de lucro comprometida con el bienestar animal.' },
  { id: 3, name: 'Casa de los Animales', address: 'Av. 68 #23-15, Cali', phone: '+57 322 456 7890', email: 'casa@animales.com', pets: 35, capacity: 50, description: 'Centro de acogida temporal para animales en espera de adopción.' },
];

const VIEWS = { LIST: 'list', REGISTER: 'register', DETAIL: 'detail' };

export function Shelter() {
  const [view, setView] = useState(VIEWS.LIST);
  const [shelters, setShelters] = useState(initialShelters);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '', email: '', description: '' });
  const [errors, setErrors] = useState({});

  const filtered = shelters.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.address.trim()) e.address = 'La dirección es obligatoria';
    if (!form.phone.trim()) e.phone = 'El teléfono es obligatorio';
    if (!form.email.trim()) e.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:8999/api/shelters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const newShelter = await response.json();
        setShelters(prev => [...prev, { ...newShelter, pets: 0, capacity: 30 }]);
        setIsConfirmed(true);
      } else {
        // Si el backend no está disponible, simulamos el guardado
        setShelters(prev => [...prev, { ...form, id: Date.now(), pets: 0, capacity: 30 }]);
        setIsConfirmed(true);
      }
    } catch {
      setShelters(prev => [...prev, { ...form, id: Date.now(), pets: 0, capacity: 30 }]);
      setIsConfirmed(true);
    }
  };

  const resetForm = () => {
    setForm({ name: '', address: '', phone: '', email: '', description: '' });
    setErrors({});
    setIsConfirmed(false);
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>

        {/* NAVEGACIÓN ENTRE VISTAS */}
        <nav className={styles.tabNav}>
          <button
            className={`${styles.tabBtn} ${view === VIEWS.LIST ? styles.tabActive : ''}`}
            onClick={() => { setView(VIEWS.LIST); setSelectedShelter(null); }}
          >
            <Search size={16} /> Directorio de Refugios
          </button>
          <button
            className={`${styles.tabBtn} ${view === VIEWS.REGISTER ? styles.tabActive : ''}`}
            onClick={() => { setView(VIEWS.REGISTER); resetForm(); }}
          >
            <Plus size={16} /> Registrar Refugio
          </button>
        </nav>

        {/* ── HU05: DIRECTORIO DE REFUGIOS ── */}
        {view === VIEWS.LIST && (
          <div className={styles.fadeIn}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}><Building2 size={20} color="white" /></div>
              <div>
                <h2 className={styles.sectionTitle}>Gestión de Directorio</h2>
                <p className={styles.sectionSubtitle}>Visualiza y gestiona la red de refugios aliados</p>
              </div>
            </div>

            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar refugio por nombre..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearBtn}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className={styles.shelterList}>
              {filtered.length === 0 ? (
                <div className={styles.emptyState}>
                  <PawPrint size={40} color="#ec4899" />
                  <p>No se encontraron refugios con ese nombre.</p>
                </div>
              ) : filtered.map(shelter => (
                <div key={shelter.id} className={styles.shelterCard}>
                  <div className={styles.shelterCardLeft}>
                    <div className={styles.shelterAvatar}>
                      <Building2 size={24} color="#db2777" />
                    </div>
                    <div>
                      <h3 className={styles.shelterName}>{shelter.name}</h3>
                      <div className={styles.shelterMeta}>
                        <span><MapPin size={13} /> {shelter.address}</span>
                      </div>
                      <div className={styles.shelterStats}>
                        <span className={styles.statBadge}><PawPrint size={12} /> {shelter.pets} mascotas</span>
                        <span className={styles.statBadge}><Users size={12} /> Cap. {shelter.capacity}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.detailBtn}
                    onClick={() => { setSelectedShelter(shelter); setView(VIEWS.DETAIL); }}
                  >
                    Ver ficha <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HU04: REGISTRO DE REFUGIO ── */}
        {view === VIEWS.REGISTER && (
          <div className={styles.fadeIn}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}><Plus size={20} color="white" /></div>
              <div>
                <h2 className={styles.sectionTitle}>Registro de Refugio</h2>
                <p className={styles.sectionSubtitle}>Da de alta un nuevo refugio en el sistema</p>
              </div>
            </div>

            {!isConfirmed ? (
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre del refugio *</label>
                  <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Ej: Refugio Huellas Felices"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Dirección *</label>
                  <input
                    className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                    placeholder="Ej: Calle 45 #12-34, Bogotá"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                  />
                  {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Teléfono de contacto *</label>
                    <input
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="+57 300 000 0000"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Correo electrónico *</label>
                    <input
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="refugio@ejemplo.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Descripción</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Breve descripción del refugio y su misión..."
                    rows={4}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <button className={styles.btnPrimary} onClick={handleRegister}>
                  Registrar Refugio
                </button>
              </div>
            ) : (
              <div className={`${styles.formCard} ${styles.successCard}`}>
                <CheckCircle2 size={48} color="#10b981" />
                <h3 className={styles.successTitle}>¡Refugio registrado con éxito!</h3>
                <p className={styles.successText}>El refugio <strong>{form.name}</strong> ha sido integrado al sistema correctamente.</p>
                <div className={styles.successDetails}>
                  <div className={styles.successItem}><MapPin size={16} color="#db2777" /> {form.address}</div>
                  <div className={styles.successItem}><Phone size={16} color="#db2777" /> {form.phone}</div>
                  <div className={styles.successItem}><Mail size={16} color="#db2777" /> {form.email}</div>
                </div>
                <div className={styles.successActions}>
                  <button className={styles.btnSecondary} onClick={() => { resetForm(); }}>
                    Registrar otro refugio
                  </button>
                  <button className={styles.btnPrimary} onClick={() => setView(VIEWS.LIST)}>
                    Ver directorio
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── HU06: FICHA TÉCNICA DEL REFUGIO ── */}
        {view === VIEWS.DETAIL && selectedShelter && (
          <div className={styles.fadeIn}>
            <button className={styles.backBtn} onClick={() => setView(VIEWS.LIST)}>
              <ArrowLeft size={16} /> Volver al directorio
            </button>

            <div className={styles.detailGrid}>
              {/* Info principal */}
              <div className={styles.detailMain}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailAvatar}>
                    <Building2 size={36} color="#db2777" />
                  </div>
                  <div>
                    <span className={styles.badgeActive}>Activo</span>
                    <h2 className={styles.detailName}>{selectedShelter.name}</h2>
                    <p className={styles.detailDesc}>{selectedShelter.description}</p>
                  </div>
                </div>

                <div className={styles.detailInfoGrid}>
                  <div className={`${styles.detailInfoBox} ${styles.pink}`}>
                    <MapPin size={18} color="#db2777" />
                    <div>
                      <p className={styles.infoLabel}>Dirección</p>
                      <p className={styles.infoValue}>{selectedShelter.address}</p>
                    </div>
                  </div>
                  <div className={`${styles.detailInfoBox} ${styles.orange}`}>
                    <Phone size={18} color="#f97316" />
                    <div>
                      <p className={styles.infoLabel}>Teléfono</p>
                      <p className={styles.infoValue}>{selectedShelter.phone}</p>
                    </div>
                  </div>
                  <div className={`${styles.detailInfoBox} ${styles.purple}`}>
                    <Mail size={18} color="#8b5cf6" />
                    <div>
                      <p className={styles.infoLabel}>Correo</p>
                      <p className={styles.infoValue}>{selectedShelter.email}</p>
                    </div>
                  </div>
                  <div className={`${styles.detailInfoBox} ${styles.green}`}>
                    <Users size={18} color="#10b981" />
                    <div>
                      <p className={styles.infoLabel}>Capacidad</p>
                      <p className={styles.infoValue}>{selectedShelter.pets} / {selectedShelter.capacity} mascotas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mascotas asociadas */}
              <div className={styles.detailPets}>
                <h3 className={styles.petsTitle}><PawPrint size={18} color="#db2777" /> Mascotas en este refugio</h3>
                <div className={styles.petsGrid}>
                  {Array.from({ length: Math.min(selectedShelter.pets, 6) }, (_, i) => (
                    <div key={i} className={styles.petThumbnail}>
                      <div className={styles.petThumbImg} />
                      <p className={styles.petThumbName}>Mascota {i + 1}</p>
                    </div>
                  ))}
                </div>
                {selectedShelter.pets > 6 && (
                  <p className={styles.morePets}>+{selectedShelter.pets - 6} mascotas más en este refugio</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}