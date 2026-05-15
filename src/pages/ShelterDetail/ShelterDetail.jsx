import { useState } from 'react';
import { MapPin, Phone, Mail, PawPrint, ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import styles from './ShelterDetail.module.css';
import { Review } from '../Review/Review';

const shelterData = {
  id: 1, // ID importante para la relación en la DB
  name: 'Refugio Huellas Felices',
  address: 'Calle 45 #12-34, Bogotá',
  phone: '+57 300 123 4567',
  email: 'huellas@refugio.com',
  description: 'Refugio dedicado al rescate y rehabilitación de animales en situación de calle. Llevamos más de 10 años trabajando por el bienestar animal.',
  schedule: 'Lunes a Viernes: 8am - 6pm | Sábados: 9am - 4pm',
  rating: 4.8,
  reviewsCount: 124,
  pets: [
    { id: 1, name: 'Luna', breed: 'Chihuahua', age: '1 año', status: 'Disponible' },
    { id: 2, name: 'Milo', breed: 'Mestizo', age: '2 años', status: 'Disponible' },
    { id: 3, name: 'Coco', breed: 'Poodle', age: '3 años', status: 'En proceso' },
  ],
};

export function ShelterDetail() {
  const [liked, setLiked] = useState(false);
  const shelter = shelterData;

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        
        <button className={styles.backBtn} onClick={() => window.history.back()}>
          <ArrowLeft size={16} /> Volver al directorio
        </button>

        {/* HERO CARD */}
        <div className={styles.heroCard}>
          <div className={styles.heroImage}>
            <div className={styles.heroBadge}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" /> {shelter.rating} ({shelter.reviewsCount} reseñas)
            </div>
            <div className={styles.heroActions}>
              <button className={`${styles.actionBtn} ${liked ? styles.liked : ''}`} onClick={() => setLiked(!liked)}>
                <Heart size={18} fill={liked ? '#db2777' : 'none'} color={liked ? '#db2777' : '#6b7280'} />
              </button>
              <button className={styles.actionBtn}><Share2 size={18} color="#6b7280" /></button>
            </div>
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.badgeActive}>Activo</span>
            <h1 className={styles.shelterName}>{shelter.name}</h1>
            <p className={styles.shelterDesc}>{shelter.description}</p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* COLUMNA IZQUIERDA: CONTACTO */}
          <div className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Información de contacto</h2>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.pink}`}><MapPin size={18} color="#db2777" /></div>
                  <div><p className={styles.contactLabel}>Dirección</p><p className={styles.contactValue}>{shelter.address}</p></div>
                </div>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.orange}`}><Phone size={18} color="#f97316" /></div>
                  <div><p className={styles.contactLabel}>Teléfono</p><p className={styles.contactValue}>{shelter.phone}</p></div>
                </div>
              </div>
              <div className={styles.scheduleBox}>
                <p className={styles.scheduleLabel}>Horario</p>
                <p className={styles.scheduleValue}>{shelter.schedule}</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: MASCOTAS */}
          <div className={styles.rightColumn}>
            <div className={styles.petsCard}>
              <h2 className={styles.cardTitle}><PawPrint size={20} color="#db2777" /> Mascotas residentes</h2>
              <div className={styles.petsGrid}>
                {shelter.pets.map(pet => (
                  <div key={pet.id} className={styles.petCard}>
                    <div className={styles.petInfo}>
                      <h3 className={styles.petName}>{pet.name}</h3>
                      <p className={styles.petBreed}>{pet.breed} · {pet.age}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECCIÓN LARGA DE RESEÑAS */}
          <div className={styles.fullWidthRow}>
            <Review shelterId={shelter.id} />
          </div>
        </div>
      </main>
    </div>
  );
}