import React from 'react';
import './ReviewsSection.css';

interface Review {
  id_resena: number;
  id_usuario: number;
  id_inmueble: number;
  calificacion: number;
  comentario: string;
  fecha_resena: string;
  estado_resena: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, loading, error }) => {
  const toggleShowMore = (index: number) => {
    // La lógica de `showMore` se manejaría aquí si fuera necesario
  };

  if (loading) {
    return <div>Cargando reseñas...</div>;
  }

  if (error) {
    return <div>Error al cargar las reseñas: {error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div>No hay reseñas para este inmueble.</div>;
  }

  return (
    <div className="reviews-section" id="reseñas">
      <div className="reviews-header">
        <h2>⭐ Calificación promedio · {reviews.length} reseñas</h2>
      </div>
      
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id_resena} className="review-card">
            <div className="review-header">
              <div className="review-avatar">
                {review.comentario.charAt(0)} {/* Usamos una inicial del comentario como placeholder */}
              </div>
              <div className="review-author">
                {/* No hay nombre de autor en tu JSON, podrías agregarlo después */}
                <h4>Usuario {review.id_usuario}</h4> 
                <p>Fecha: {new Date(review.fecha_resena).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="review-content">
              <div className="review-rating">
                {'★'.repeat(review.calificacion)}{'☆'.repeat(5 - review.calificacion)}
              </div>
              <p className="review-text">{review.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;