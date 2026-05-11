import { useState } from 'react';
import { MapPin, Phone, Mail, PawPrint, ArrowLeft, Heart, Share2, Star, Send } from 'lucide-react';
import styles from './ShelterDetail.module.css';

const REVIEWS_API = 'http://localhost:8999/api/reviews';

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
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comments: '', adoptionId: '', adopterId: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shelter = shelterData;

  const handleSubmitReview = async () => {
    if (reviewForm.rating === 0) { setReviewError('Por favor selecciona una calificación.'); return; }
    if (!reviewForm.comments.trim()) { setReviewError('Por favor escribe un comentario.'); return; }
    if (!reviewForm.adoptionId) { setReviewError('El ID de adopción es obligatorio.'); return; }
    if (!reviewForm.adopterId) { setReviewError('El ID del adoptante es obligatorio.'); return; }

    setReviewError(null);
    setSubmitting(true);

    try {
      const payload = {
        rating: reviewForm.rating,
        comments: reviewForm.comments,
        reviewDate: new Date().toISOString().split('T')[0],
        adoptionId: Number(reviewForm.adoptionId),
        adopterId: Number(reviewForm.adopterId),
      };

      const response = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 201) {
        const saved = await response.json();
        setReviews(prev => [saved, ...prev]);
        setReviewForm({ rating: 0, comments: '', adoptionId: '', adopterId: '' });
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 3000);
      } else {
        const err = await response.json().catch(() => ({}));
        setReviewError(err.message || 'Error al enviar la reseña.');
      }
    } catch {
      setReviewError('No se pudo conectar con el servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>

        {/* BOTÓN VOLVER */}
        <button className={styles.backBtn} onClick={() => window.history.back()}>
          <ArrowLeft size={16} /> Volver al directorio
        </button>

        {/* HERO */}
        <div className={styles.heroCard}>
          <div className={styles.heroImage}>
            <div className={styles.heroBadge}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" /> {shelter.rating} ({shelter.reviews} reseñas)
            </div>
            <div className={styles.heroActions}>
              <button className={`${styles.actionBtn} ${liked ? styles.liked : ''}`} onClick={() => setLiked(!liked)}>
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

          {/* COLUMNA IZQUIERDA */}
          <div className={styles.leftColumn}>

            {/* INFORMACIÓN DE CONTACTO */}
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Información de contacto</h2>
              <p className={styles.readOnlyNote}>Esta información es de solo lectura</p>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.pink}`}><MapPin size={18} color="#db2777" /></div>
                  <div>
                    <p className={styles.contactLabel}>Dirección</p>
                    <p className={styles.contactValue}>{shelter.address}</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.orange}`}><Phone size={18} color="#f97316" /></div>
                  <div>
                    <p className={styles.contactLabel}>Teléfono</p>
                    <p className={styles.contactValue}>{shelter.phone}</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={`${styles.contactIcon} ${styles.purple}`}><Mail size={18} color="#8b5cf6" /></div>
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

            {/* SECCIÓN DE COMENTARIOS */}
            <div className={styles.reviewCard}>
              <h2 className={styles.cardTitle}>
                <Star size={20} color="#f59e0b" /> Dejar una reseña
              </h2>
              <p className={styles.readOnlyNote}>Comparte tu experiencia con este refugio</p>

              {/* ESTRELLAS */}
              <div className={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={styles.starBtn}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  >
                    <Star
                      size={28}
                      fill={(hoverRating || reviewForm.rating) >= star ? '#f59e0b' : 'none'}
                      color={(hoverRating || reviewForm.rating) >= star ? '#f59e0b' : '#d1d5db'}
                    />
                  </button>
                ))}
                {reviewForm.rating > 0 && (
                  <span className={styles.ratingLabel}>{reviewForm.rating}/5</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Comentario *</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Cuéntanos tu experiencia con este refugio..."
                  rows={3}
                  value={reviewForm.comments}
                  onChange={e => setReviewForm({ ...reviewForm, comments: e.target.value })}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>ID de adopción *</label>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="Ej: 1"
                    value={reviewForm.adoptionId}
                    onChange={e => setReviewForm({ ...reviewForm, adoptionId: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>ID del adoptante *</label>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="Ej: 1"
                    value={reviewForm.adopterId}
                    onChange={e => setReviewForm({ ...reviewForm, adopterId: e.target.value })}
                  />
                </div>
              </div>

              {reviewError && <p className={styles.errorMsg}>{reviewError}</p>}
              {reviewSuccess && <p className={styles.successMsg}>¡Reseña enviada con éxito!</p>}

              <button
                className={styles.btnSubmitReview}
                onClick={handleSubmitReview}
                disabled={submitting}
              >
                <Send size={16} /> {submitting ? 'Enviando...' : 'Enviar reseña'}
              </button>

              {/* RESEÑAS ENVIADAS EN ESTA SESIÓN */}
              {reviews.length > 0 && (
                <div className={styles.reviewsList}>
                  <h3 className={styles.reviewsTitle}>Reseñas recientes</h3>
                  {reviews.map((r, i) => (
                    <div key={i} className={styles.reviewItem}>
                      <div className={styles.reviewStars}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={14} fill={r.rating >= s ? '#f59e0b' : 'none'} color={r.rating >= s ? '#f59e0b' : '#d1d5db'} />
                        ))}
                      </div>
                      <p className={styles.reviewComment}>{r.comments}</p>
                      <p className={styles.reviewDate}>{r.reviewDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA - MASCOTAS */}
          <div className={styles.rightColumn}>
            <div className={styles.petsCard}>
              <h2 className={styles.cardTitle}>
                <PawPrint size={20} color="#db2777" /> Mascotas en este refugio
              </h2>
              <p className={styles.petsCount}>{shelter.pets.length} mascotas disponibles para adopción</p>
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
                      <p className={styles.petSpecies}>{pet.species}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}