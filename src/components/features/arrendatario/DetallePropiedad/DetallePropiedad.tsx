import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LuHouse, LuBuilding, LuBed, LuMapPin, LuWifi, LuTv,
  LuDroplet, LuShowerHead, LuCar, LuPawPrint,
  LuDoorClosed, LuBath, LuUtensils, LuCamera, LuPencilLine, LuHeart, LuHeartOff,
} from 'react-icons/lu';
import { Button } from '../../../ui/Button/Button';
import { getInmuebleById } from '../../../../services/inmuebles';
import { getReviewsByInmueble, createReview } from '../../../../services/reviews';

import { authService } from '../../../../services/authService';
import type { Inmueble } from '../../../../types/inmuebles';
import GallerySection from '../GallerySection/GallerySection';
import ReservationCard from '../ReservationCard/ReservationCard';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import LeaveReviewModal from '../LeaveReviewModal/LeaveReviewModal';
import './DetallePropiedad.css';

const iconMap: { [key: string]: React.ElementType } = {
  'casa': LuHouse,
  'departamento': LuBuilding,
  'cuarto': LuBed,
  'baños': LuBath,
  'habitaciones': LuDoorClosed,
  'camas': LuBed,
  'wifi': LuWifi,
  'cocina': LuUtensils,
  'estacionamiento': LuCar,
  'television': LuTv,
  'aire_acondicionado': LuDroplet,
  'servicio_lavanderia': LuShowerHead,
  'camaras_seguridad': LuCamera,
  'mascotas_permitidas': LuPawPrint,
};

const DetallePropiedad = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingFavorito, setLoadingFavorito] = useState(false); // Estado de carga para el botón de favorito
  const [error, setError] = useState<string | null>(null);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);

  useEffect(() => {
    const fetchInmueble = async () => {
      if (!id) {
        setError('ID del inmueble no proporcionado.');
        setLoading(false);
        return;
      }
      try {
        const data = await getInmuebleById(id);
        if (!data.imagenes || data.imagenes.length === 0) {
          data.imagenes = [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
          ];
        }
        setInmueble(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el inmueble.');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!id) return;
      setLoadingReviews(true);
      try {
        const data = await getReviewsByInmueble(id);
        setReviews(data);
      } catch (err: any) {
        setReviews([]);
        console.error('Error al obtener reseñas:', err);
      } finally {
        setLoadingReviews(false);
      }
    };
    
    fetchInmueble();
    fetchReviews();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!inmueble) {
    return <div>Inmueble no encontrado.</div>;
  }

  const handleOpenReviewModal = () => setShowLeaveReviewModal(true);
  const handleCloseReviewModal = () => setShowLeaveReviewModal(false);
  const handleSubmitReview = async (rating: number, reviewText: string) => {
    const token = authService.getToken();
    if (!token) {
      setError('No se ha iniciado sesión.');
      handleCloseReviewModal();
      return;
    }

    try {
      await createReview({
        id_inmueble: inmueble!.id_inmueble,
        calificacion: rating,
        comentario: reviewText,
      }, token);
      console.log('Reseña enviada al backend');
      const updatedReviews = await getReviewsByInmueble(inmueble.id_inmueble);
      setReviews(updatedReviews);
      handleCloseReviewModal();
    } catch (error: any) {
      setError(error.message || 'Error al enviar la reseña.');
    }
  };



  const renderFeature = (key: keyof Inmueble, label: string) => {
    if (typeof inmueble[key] === 'boolean' && inmueble[key]) {
      const Icon = iconMap[key as string];
      return (
        <li key={key}>
          {Icon && <Icon size={20} />}
          <span>{label}</span>
        </li>
      );
    }
    if (typeof inmueble[key] === 'number' && inmueble[key] > 0) {
      const Icon = iconMap[key as string];
      return (
        <li key={key}>
          {Icon && <Icon size={20} />}
          <span>{inmueble[key]} {label}</span>
        </li>
      );
    }
    return null;
  };

  return (
    <div className="detalle-propiedad-container">
      <header className="detalle-propiedad-header">
        <h1>{inmueble.titulo}</h1>
        <div className="detalle-propiedad__buttons">
            <Button variant="outline" onClick={handleOpenReviewModal}>
                <LuPencilLine size={16} />Revisar
            </Button>
            {/* Botón para solo agregar a favoritos */}
            <Button variant="outline">
                <LuHeartOff size={16} />
                Guardar
            </Button>
        </div>
      </header>
      <div className="detalle-propiedad-meta">
        <p><LuMapPin /> {inmueble.direccion}</p>
        <span className="detalle-propiedad-type">
          {iconMap[inmueble.tipo_inmueble] && React.createElement(iconMap[inmueble.tipo_inmueble])} {inmueble.tipo_inmueble}
        </span>
      </div>

      {inmueble.imagenes && inmueble.imagenes.length > 0 && (
        <GallerySection imagenes={inmueble.imagenes} />
      )}

      <div className="detalle-propiedad__content">
        <div className="detalle-propiedad__info">
          <section className="detalle-propiedad-section">
            <h2>Acerca de este lugar</h2>
            <p>{inmueble.descripcion}</p>
            <p><strong>Referencias:</strong> {inmueble.referencias}</p>
          </section>

          <hr />

          <section className="detalle-propiedad-section">
            <h2>Detalles y servicios</h2>
            <div className="detalle-propiedad-features">
              <ul>
                {renderFeature('huespedes', 'huéspedes')}
                {renderFeature('habitaciones', 'habitaciones')}
                {renderFeature('banos', 'baños')}
                {renderFeature('camas', 'camas')}
                {renderFeature('wifi', 'Wi-Fi')}
                {renderFeature('cocina', 'Cocina')}
                {renderFeature('estacionamiento', 'Estacionamiento')}
                {renderFeature('television', 'Televisión')}
                {renderFeature('aire_acondicionado', 'Aire Acondicionado')}
                {renderFeature('servicio_lavanderia', 'Servicio de Lavandería')}
                {renderFeature('camaras_seguridad', 'Cámaras de Seguridad')}
                {renderFeature('mascotas_permitidas', 'Mascotas Permitidas')}
              </ul>
            </div>
          </section>

          <ReviewsSection 
            reviews={reviews} 
            loading={loadingReviews} 
            error={error} 
          />
        </div>

        <div className="detalle-propiedad__sidebar">
          <ReservationCard 
            precio={inmueble.precio_mensual} 
            calificacion={4.5} 
            inmuebleId={id as string} 
          />
        </div>
      </div>
      <LeaveReviewModal
        isOpen={showLeaveReviewModal}
        onClose={handleCloseReviewModal}
        onSubmit={handleSubmitReview}
        inmuebleId={inmueble.id_inmueble}
      />
    </div>
  );
};

export default DetallePropiedad;
