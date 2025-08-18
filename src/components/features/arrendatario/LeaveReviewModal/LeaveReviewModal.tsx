import React, { useState } from 'react';
import { Button } from '../../../ui';
import { Modal } from '../../../ui/Modal/Modal';
import './LeaveReviewModal.css';

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  inmuebleId: number; // Add this line to the interface
}

const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    onSubmit(rating, review);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <h3>Deja tu reseña</h3>
          <button className="report-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="report-modal-body">
          <div className="form-group">
            <label>Calificación</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Tu reseña</label>
            <textarea
              placeholder="Comparte tu experiencia..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
        <div className="report-modal-footer">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={rating === 0 || review === ''}
          >
            Publicar reseña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewModal;
