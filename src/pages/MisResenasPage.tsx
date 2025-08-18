import React, { useEffect, useState } from 'react';
import { NavbarArrendatario, Footer } from '../components/layout';
import { getMisReviews, type Review } from '../services/reviews';
import { authService } from '../services/authService';
import './MisResenasPage.css';

const MisResenasPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = authService.getToken();
            if (!token) {
                setError('No se ha iniciado sesión.');
                setLoading(false);
                return;
            }

            try {
                const data = await getMisReviews(token);
                setReviews(data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar las reseñas.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return <div>Cargando reseñas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavbarArrendatario />
            <div className="mis-resenas-container">
                <h1>Mis Reseñas</h1>
                {reviews.length === 0 ? (
                    <p>No has escrito ninguna reseña.</p>
                ) : (
                    <ul className="resenas-list">
                        {reviews.map((review) => (
                            <li key={review.id_resena} className="resena-item">
                                <div className="resena-rating">
                                    {'★'.repeat(review.calificacion)}{'☆'.repeat(5 - review.calificacion)}
                                </div>
                                <p>"{review.comentario}"</p>
                                <p className="resena-date">
                                    <small>Fecha: {new Date(review.fecha_resena || '').toLocaleDateString()}</small>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer 
                companyName="UBIKHA"
                year={2025}
            />
        </div>
    );
};

export default MisResenasPage;