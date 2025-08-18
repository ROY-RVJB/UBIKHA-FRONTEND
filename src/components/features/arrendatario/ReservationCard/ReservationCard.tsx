import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createReserva } from '../../../../services/reservas';
import { authService } from '../../../../services/authService';
import './ReservationCard.css';

interface ReservationCardProps {
  precio: number;
  calificacion?: number;
  fechaDisponible?: string;
  inmuebleId: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ precio, calificacion, fechaDisponible, inmuebleId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleReservaClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = authService.getToken();
    if (!token) {
      setError('Debes iniciar sesión para reservar.');
      setLoading(false);
      return;
    }

    try {
      const inmuebleIdNumber = parseInt(inmuebleId, 10);
      const montoTotal = precio;

      const reservaPayload = {
        id_inmueble: inmuebleIdNumber,
        monto_total: montoTotal
      };

      await createReserva(reservaPayload, token);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al procesar la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reserva-card">
      <div className="reserva-top-row">
        <div className="reserva-precio">
          <span className="precio-monto">S/ {precio.toLocaleString('es-PE')}</span>
          <span className="precio-periodo">/ mes</span>
        </div>

        {calificacion && (
          <div className="reserva-rating">
            <FaStar size={16} className="estrella-icono" />
            <span className="rating-num">{calificacion.toFixed(1)}</span>
            <span className="reseñas">
              · <a href="#opiniones">7 reseñas</a>
            </span>
          </div>
        )}
      </div>

      {fechaDisponible && (
        <div className="reserva-card__availability">
          🗓️ Disponible desde {new Date(fechaDisponible).toLocaleDateString('es-PE')}
        </div>
      )}

      <div className="reserva-garantia">
        Pago con garantía: + S/ {precio.toLocaleString('es-PE')}
      </div>
    
      {/* Muestra mensajes de estado */}
      {loading && <div className="text-info">Procesando reserva...</div>}
      {error && <div className="text-danger">{error}</div>}
      {success && <div className="text-success">¡Reserva realizada!</div>} {/* <-- AQUÍ ESTÁ EL CAMBIO */}

      <button 
        className="btn-reserva" 
        onClick={handleReservaClick}
        disabled={loading}
      >
        {loading ? 'Reservando...' : 'Reserva'}
      </button>

      <div className="reserva-nota">
        No se hará ningún cargo por el momento
      </div>
    </div>
  );
};

export default ReservationCard;
