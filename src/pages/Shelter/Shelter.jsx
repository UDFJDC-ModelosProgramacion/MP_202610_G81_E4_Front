import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Search, Plus, Building2, ChevronRight, X, CheckCircle2, Users, PawPrint, ArrowLeft } from 'lucide-react';
import styles from './Shelter.module.css';

const API_URL = 'http://localhost:8999/api/shelters';
const VIEWS = { LIST: 'list', REGISTER: 'register', DETAIL: 'detail' };

export function Shelter() {
  const [view, setView] = useState(VIEWS.LIST);
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', address: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    setLoading(true);
    setErrorApi(null);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setShelters(data);
      } else {
        setErrorApi('No se pudo cargar la lista de refugios.');
      }
    } catch {
      setErrorApi('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = shelters.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.city.trim()) e.city = 'La ciudad es obligatoria';
    if (!form.address.trim()) e.address = 'La dirección es obligatoria';
    if (!form.phone.trim()) e.phone = 'El teléfono es obligatorio';
    if (!form.email.trim()) e.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setErrorApi(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok || response.status === 201) {
        const newShelter = await response.json();
        setShelters(prev => [...prev, newShelter]);
        setIsConfirmed(true);
      } else {
        const errorText = await response.text().catch(() => '');
        setErrorApi(`Error al registrar: ${errorText || response.status}`);
      }
    } catch {
      setErrorApi('No se pudo conectar con el servidor. Verifica que el backend esté corriendo en el puerto 8999.');
    }
  };

  const resetForm = () => {
    setForm({ name: '', city: '', address: '', phone: '', email: '' });
    setErrors({});
    setIsConfirmed(false);
    setErrorApi(null);
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>

        <nav className={styles.tabNav}>
          <button
            className={`${styles.tabBtn} ${view === VIEWS.LIST ? styles.tabActive : ''}`}
            onClick={() => { setView(VIEWS.LIST); setSelectedShelter(null); fetchShelters(); }}
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

        {/* ── HU05: DIRECTORIO ── */}
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

            {loading && <p className={styles.loadingMsg}>Cargando refugios...</p>}
            {errorApi && <p className={styles.errorApi}>{errorApi}</p>}

            {!loading && (
              <div className={styles.shelterList}>
                {filtered.length === 0 ? (
                  <div className={styles.emptyState}>
                    <PawPrint size={40} color="#ec4899" />
                    <p>No se encontraron refugios.</p>
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
                          <span><MapPin size={13} /> {shelter.city || 'Bogotá'} · {shelter.address || ''}</span>
                        </div>
                        <div className={styles.shelterStats}>
                          <span className={styles.statBadge}><Phone size={12} /> {shelter.phone}</span>
                          <span className={styles.statBadge}><Mail size={12} /> {shelter.email}</span>
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
            )}
          </div>
        )}

        {/* ── HU04: REGISTRO ── */}
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
                {errorApi && <p className={styles.errorApi}>{errorApi}</p>}

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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Ciudad *</label>
                    <input
                      className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                      placeholder="Ej: Bogotá"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                    />
                    {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Dirección *</label>
                    <input
                      className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                      placeholder="Ej: Calle 45 #12-34"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                    />
                    {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
                  </div>
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
                  <div className={styles.successItem}><MapPin size={16} color="#db2777" /> {form.city || 'Ciudad no especificada'} · {form.address}</div>
                  <div className={styles.successItem}><Phone size={16} color="#db2777" /> {form.phone}</div>
                  <div className={styles.successItem}><Mail size={16} color="#db2777" /> {form.email}</div>
                </div>
                <div className={styles.successActions}>
                  <button className={styles.btnSecondary} onClick={resetForm}>
                    Registrar otro refugio
                  </button>
                  <button className={styles.btnPrimary} onClick={() => { setView(VIEWS.LIST); fetchShelters(); }}>
                    Ver directorio
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── HU06: FICHA TÉCNICA ── */}
        {view === VIEWS.DETAIL && selectedShelter && (
          <div className={styles.fadeIn}>
            <button className={styles.backBtn} onClick={() => setView(VIEWS.LIST)}>
              <ArrowLeft size={16} /> Volver al directorio
            </button>

            <div className={styles.detailGrid}>
              <div className={styles.detailMain}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailAvatar}>
                    <Building2 size={36} color="#db2777" />
                  </div>
                  <div>
                    <span className={styles.badgeActive}>Activo</span>
                    <h2 className={styles.detailName}>{selectedShelter.name}</h2>
                    <p className={styles.detailDesc}>{selectedShelter.city}</p>
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
                </div>
              </div>

              <div className={styles.detailPets}>
                <h3 className={styles.petsTitle}><PawPrint size={18} color="#db2777" /> Mascotas en este refugio</h3>
                <div className={styles.petsGrid}>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className={styles.petThumbnail}>
                      <div className={styles.petThumbImg} />
                      <p className={styles.petThumbName}>Mascota {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}