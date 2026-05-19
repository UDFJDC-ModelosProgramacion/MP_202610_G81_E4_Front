import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import style from './Review.module.css';

export const Review = ({ shelterId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ comments: '', rating: 0, adoptionId: '', adopterId: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.reverse());
      }
    } catch (error) {
      console.error("Error cargando reseñas");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!formData.rating || !formData.comments.trim() || !formData.adoptionId || !formData.adopterId) {
      setStatus({ type: 'error', msg: 'Todos los campos son obligatorios.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    // Payload idéntico al formato exitoso de Postman
    const reviewPayload = {
      comments: formData.comments.trim(),
      rating: parseInt(formData.rating),
      reviewDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      adoptionId: parseInt(formData.adoptionId),
      adopterId: parseInt(formData.adopterId)
    };

    try {
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewPayload),
      });

      if (response.ok || response.status === 201) {
        const saved = await response.json();
        setComments(prev => [saved, ...prev]);
        setFormData({ comments: '', rating: 0, adoptionId: '', adopterId: '' });
        setStatus({ type: 'success', msg: '¡Reseña publicada!' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        // Si el error es por el @OneToOne unique = true, aquí saldrá el mensaje
        setStatus({ type: 'error', msg: errorData.message || 'Error al enviar la reseña.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Error al enviar la reseña.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={style.loading}>Cargando...</div>;

  return (
    <div className={style.reviewsWrapper}>
      <h3 className={style.title}><MessageSquare size={24} color="#db2777" /> Comunidad y Experiencias</h3>

      <div className={style.inputBox}>
        <div className={style.topFormRow}>
          <div className={style.ratingSelector}>
            <span className={style.label}>Tu calificación:</span>
            <div className={style.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" className={style.starBtn}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormData({ ...formData, rating: s })}>
                  <Star size={28} fill={(hoverRating || formData.rating) >= s ? "#f59e0b" : "none"} color={(hoverRating || formData.rating) >= s ? "#f59e0b" : "#d1d5db"} />
                </button>
              ))}
            </div>
          </div>
          
          <div className={style.idsRow}>
            <input type="number" placeholder="ID Adopción" className={style.miniInput} value={formData.adoptionId} onChange={(e) => setFormData({ ...formData, adoptionId: e.target.value })} />
            <input type="number" placeholder="ID Adoptante" className={style.miniInput} value={formData.adopterId} onChange={(e) => setFormData({ ...formData, adopterId: e.target.value })} />
          </div>
        </div>

        <textarea 
          placeholder="Escribe aquí tu experiencia..."
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          className={style.textarea}
        />

        <div className={style.formFooter}>
          <div className={style.statusArea}>
             {status.msg && <span className={`${style.statusMsg} ${style[status.type]}`}>{status.msg}</span>}
          </div>
          <button onClick={handleSend} disabled={submitting} className={style.sendBtn}>
             {submitting ? 'Enviando...' : 'Publicar Reseña'}
          </button>
        </div>
      </div>

      <div className={style.commentsList}>
        {comments.map((c) => (
          <div key={c.id} className={style.commentCard}>
            <div className={style.commentHeader}>
              <div className={style.userInfo}>
                <div className={style.userAvatar}><User size={18} /></div>
                <div>
                  <p className={style.userName}>Adoptante #{c.adopterId}</p>
                  <span className={style.commentDate}>{c.reviewDate}</span>
                </div>
              </div>
              <div className={style.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < c.rating ? "#f59e0b" : "none"} color={i < c.rating ? "#f59e0b" : "#d1d5db"} />
                ))}
              </div>
            </div>
            <p className={style.commentText}>{c.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};