import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User, CheckCircle } from 'lucide-react';
import style from './Review.module.css';

export const Review = ({ shelterId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [shelterId]);

  const handleSend = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      comments: newComment,
      rating: 5,
      reviewDate: new Date().toISOString().split('T')[0],
      adoptionId: 2,
      adopterId: 2
    };

    try {
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments((prev) => [savedComment, ...prev]);
        setNewComment('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        console.error("Detalle del error:", errorData);
        alert(`Error: ${errorData.message || 'No se pudo guardar la reseña'}`);
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    }
  };

  if (loading) return <div className={style.loading}>Cargando reseñas...</div>;

  return (
    <div className={style.reviewsWrapper}>
      <h3 className={style.title}>
        <MessageSquare size={20} color="#db2777" /> 
        Comentarios de la comunidad
      </h3>

      <div className={style.inputBox}>
        <textarea 
          placeholder="Escribe tu comentario aquí..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={style.textarea}
        />
        <button onClick={handleSend} className={style.sendBtn}>
          <Send size={16} /> Publicar
        </button>
      </div>

      {showSuccess && (
        <div className={style.successMessage} style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', 
          backgroundColor: '#ecfdf5', padding: '10px', borderRadius: '8px', 
          marginBottom: '15px', fontSize: '0.9rem', border: '1px solid #10b981'
        }}>
          <CheckCircle size={18} />
          Comentario subido con éxito
        </div>
      )}

      <div className={style.commentsList}>
        {comments.length === 0 ? (
          <p className={style.noComments}>No hay reseñas aún.</p>
        ) : (
          comments.map((c) => (
            <div key={`review-${c.id || Math.random()}`} className={style.commentCard}>
              <div className={style.commentHeader}>
                <div className={style.userAvatar}>
                  <User size={14} color="#6b7280" />
                </div>
                <span className={style.userName}>
                  {c.adopter?.firstName || 'Adoptante'}
                </span>
                <div className={style.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} size={12} 
                      fill={i < (c.rating || 0) ? "#f59e0b" : "none"} 
                      color={i < (c.rating || 0) ? "#f59e0b" : "#d1d5db"} 
                    />
                  ))}
                </div>
              </div>
              <p className={style.commentText}>{c.comments}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};