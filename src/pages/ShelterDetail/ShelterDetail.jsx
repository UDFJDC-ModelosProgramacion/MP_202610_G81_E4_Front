import { useState } from 'react';
import { MapPin, Phone, Mail, PawPrint, ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import styles from './ShelterDetail.module.css';
import { Review } from '../Review/Review';

// Datos de ejemplo del refugio (Hardcoded para la vista)
const shelterData = {
  id: 1,
  name: 'Refugio Huellas Felices',
  address: 'Calle 45 #12-34, Bogotá',
  phone: '+57 300 123 4567',
  email: 'huellas@refugio.com',
  description: 'Refugio dedicado al rescate y rehabilitación de animales en situación de calle. Llevamos más de 10 años trabajando por el bienestar animal en Bogotá.',
  schedule: 'Lunes a Viernes: 8am - 6pm | Sábados: 9am - 4pm',
  rating: 4.8,
  reviews: 124,
  pets: [
    { id: 1, name: 'Luna', species: 'Perro', breed: 'Chihuahua', age: '1 año', status: 'Disponible' },
    { id: 2, name: 'Milo', species: 'Gato', breed: 'Mestizo', age: '2 años', status: 'Disponible' },
    { id: 3, name: 'Coco', species: 'Perro', breed: 'Poodle', age: '3 años', status: 'En proceso' },
    { id: 4, name: 'Nala', species: 'Gato', breed: 'Siamés', age: '6 meses', status: 'Disponible' },
    { id: 5, name: 'Max', species: 'Perro', breed: 'Labrador', age: '4 años', status: 'Disponible' },
    { id: 6, name: 'Bella', species: 'Perro', breed: 'Beagle', age: '2 años', status: 'En proceso' },
  ],
};

export function ShelterDetail() {
  const [liked, setLiked] = useState(false);
  const shelter = shelterData;

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>

        {/* BOTÓN VOLVER */}
        <button className={styles.backBtn} onClick={() => window.history.back()}>
          <ArrowLeft size={16} /> Volver al directorio
        </button>

        {/* ENCABEZADO DEL REFUGIO */}
        <div className={styles.heroCard}>
          <div className={styles.heroImage}>
            <div className={styles.heroBadge}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" /> {shelter.rating} ({shelter.reviews} reseñas)
            </div>
            <div className={styles.heroActions}>
              <button
                className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={18} fill={liked ? '#db2777' : 'none'} color={liked ? '#db2777' : '#6b7280'} />
              </button>
              <button className={styles.actionBtn}>
                <Share2 size={18} color="#6b7280" />
              </button>
            </div>
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.badgeActive}>Activo</span>
            <h1 className={styles.shelterName}>{shelter.name}</h1>
            <p className={styles.shelterDesc}>{shelter.description}</p>
          </div>
        </div>

        <div className={styles.contentGrid}>

          {/* COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO */}
          <div className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Información de contacto</h2>
              <p className={styles.readOnlyNote}>Esta información es de solo lectura</p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.pink}`}>
                    <MapPin size={18} color="#db2777" />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Dirección</p>
                    <p className={styles.contactValue}>{shelter.address}</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.orange}`}>
                    <Phone size={18} color="#f97316" />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Teléfono</p>
                    <p className={styles.contactValue}>{shelter.phone}</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.purple}`}>
                    <Mail size={18} color="#8b5cf6" />
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Correo electrónico</p>
                    <p className={styles.contactValue}>{shelter.email}</p>
                  </div>
                </div>
              </div>

              <div className={styles.scheduleBox}>
                <p className={styles.scheduleLabel}>Horario de atención</p>
                <p className={styles.scheduleValue}>{shelter.schedule}</p>
              </div>

              <a href={`mailto:${shelter.email}`} className={styles.btnContact}>
                <Mail size={16} /> Contactar refugio
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: MASCOTAS ASOCIADAS */}
          <div className={styles.rightColumn}>
            <div className={styles.petsCard}>
              <h2 className={styles.cardTitle}>
                <PawPrint size={20} color="#db2777" /> Mascotas residentes
              </h2>
              <p className={styles.petsCount}>{shelter.pets.length} huellas esperando un hogar</p>

              <div className={styles.petsGrid}>
                {shelter.pets.map(pet => (
                  <div key={pet.id} className={styles.petCard}>
                    <div className={styles.petImage} />
                    <div className={styles.petInfo}>
                      <div className={styles.petHeader}>
                        <h3 className={styles.petName}>{pet.name}</h3>
                        <span className={`${styles.petStatus} ${pet.status === 'Disponible' ? styles.available : styles.inProcess}`}>
                          {pet.status}
                        </span>
                      </div>
                      <p className={styles.petBreed}>{pet.breed} · {pet.age}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NUEVA SECCIÓN: COMENTARIOS Y RESEÑAS (Ocupa todo el ancho) */}
          <div className={styles.fullWidthRow}>
            <Review />
          </div>

        </div>
      </main>
    </div>
  );
}