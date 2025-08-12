import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui';
// IMPORTACIÓN DE AMBOS MODALES
import ReportModal from '../ReportModal/ReportModal';
import ReportDescriptionModal from '../ReportDescriptionModal/ReportDescriptionModal';
import ReportConfirmationModal from '../ReportConfirmationModal/ReportConfirmationModal'; // Importar el nuevo modal
import GallerySection from '../GallerySection/GallerySection';
import ReservationCard from '../ReservationCard/ReservationCard';
import LandlordSection from '../LandlordSection/LandlordSection';
import PropertyFeatures from '../PropertyFeatures/PropertyFeatures';
import ReportAdLink from '../ReportAdLink/ReportAdLink';
import PropertyMap from './PropertyMap/PropertyMap';
import './DetallePropiedad.css';
import type { Property } from './../../../../types'; // Importa la interfaz Property

interface DetallePropiedadProps {
  inmueble: Property;
}

const DetallePropiedad: React.FC<DetallePropiedadProps> = ({ inmueble }) => {
  const navigate = useNavigate();
  const [showStickyNav, setShowStickyNav] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // NUEVOS ESTADOS PARA CONTROLAR EL FLUJO DE LOS MODALES
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Nuevo estado para el modal de confirmación
  const [selectedReason, setSelectedReason] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const topPosition = sidebarRef.current.getBoundingClientRect().top;
        if (topPosition <= 0) {
          setShowStickyNav(true);
        } else {
          setShowStickyNav(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const propertyData = {
    ...inmueble,
    imagenes: inmueble.imageUrl ? [inmueble.imageUrl] : [],
    descripcion: inmueble.descripcion || 'No hay descripción disponible para este inmueble.',
    arrendador: inmueble.arrendador || {
      nombre: "Propietario Desconocido",
      fechaUnion: "Fecha Desconocida",
      reseñas: 0,
      verificado: false,
      superArrendador: false,
      indiceRespuestas: 0,
      tiempoRespuesta: "Desconocido"
    }
  };

  // FUNCIÓN PARA ABRIR EL PRIMER MODAL
  const openReportModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowReasonModal(true);
  };

  // FUNCIÓN PARA CERRAR EL PRIMER MODAL Y ABRIR EL SEGUNDO
  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setShowReasonModal(false);
    setShowDescriptionModal(true);
  };

  // FUNCIÓN PARA VOLVER DEL SEGUNDO MODAL AL PRIMERO
  const handleBack = () => {
    setShowDescriptionModal(false);
    setShowReasonModal(true);
  };

  // FUNCIÓN PARA ENVIAR EL REPORTE FINAL Y CERRAR TODO
  const handleReportSubmit = (description: string) => {
    console.log(`Reporte enviado. Razón: ${selectedReason}, Descripción: ${description}`);
    // Aquí iría la lógica para enviar el reporte al backend
    // Por ahora, solo muestra el modal de confirmación.
    setShowDescriptionModal(false);
    setShowConfirmationModal(true); // Mostrar el modal de confirmación
    setSelectedReason('');
  };

  return (
    <div className="detalle-propiedad">
      <div className="sticky-nav-container">
        <nav className={`sticky-nav ${showStickyNav ? 'visible' : ''}`}>
          <div className="sticky-nav__links">
            <a href="#fotos">Fotos</a>
            <a href="#servicios">Servicios</a>
            <a href="#arrendador">Reseñas</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
          <div className="sticky-nav__actions">
            <div className="sticky-nav__price-info">
              <span className="sticky-nav__price">
                S/ {propertyData.precio}
              </span>
              <div className="sticky-nav__rating">
                <span className="sticky-nav__star">⭐</span>
                <span className="sticky-nav__rating-num">{propertyData.calificacion?.toFixed(1)}</span>
                ·
                <a href="#arrendador">
                  <span className="sticky-nav__reviews">7 reseñas</span>
                </a>
              </div>
            </div>
            <Button variant="primary" size="sm">Reserva</Button>
          </div>
        </nav>
      </div>
      <div className="detalle-propiedad__header">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
      <div className="detalle-propiedad__info">
        <h1>{propertyData.titulo}</h1>
        <div className="detalle-propiedad__meta">
          <span>🏠 {propertyData.tipo}</span>
          <span>📍 {propertyData.ubicacion}</span>
          {propertyData.calificacion && (
            <span>⭐ {propertyData.calificacion.toFixed(1)}</span>
          )}
        </div>
      </div>
      <div id="fotos">
        <GallerySection imagenes={propertyData.imagenes} />
      </div>
      <div className="detalle-propiedad__content">
        <div className="detalle-propiedad__info">
          <div className="detalle-propiedad__section">
            <h2>Acerca de este lugar</h2>
            <p>{propertyData.descripcion}</p>
          </div>
          <div id="servicios">
            <PropertyFeatures caracteristicas={propertyData.caracteristicas} />
          </div>
          {propertyData.arrendador && (
            <div id="arrendador">
              <LandlordSection arrendador={propertyData.arrendador} />
            </div>
          )}
          <div className="detalle-propiedad__section" id="ubicacion">
            <h2>Ubicación</h2>
            <div className="property-map-container">
              <PropertyMap
                latitude={-12.59}
                longitude={-69.19}
                locationGroups={[{ title: "Ubicación de la Propiedad", locations: [propertyData.ubicacion] }]}
                zoom={14}
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'}
              />
            </div>
          </div>
        </div>
        <div className="detalle-propiedad__sidebar" ref={sidebarRef}>
          <div className="sidebar-sticky-container">
            <ReservationCard
              precio={propertyData.precio}
              calificacion={propertyData.calificacion}
              fechaDisponible={propertyData.fechaDisponible}
            />
            <ReportAdLink openReportModal={openReportModal} />
          </div>
        </div>
      </div>
      
      {/* 1. Modal para seleccionar la razón */}
      <ReportModal
        isOpen={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        onSelectReason={handleReasonSelect}
      />
      
      {/* 2. Modal para la descripción, se muestra solo después de seleccionar una razón */}
      <ReportDescriptionModal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        onBack={handleBack}
        onSubmit={handleReportSubmit}
        reason={selectedReason}
      />

      {/* 3. Modal de confirmación, se muestra después de enviar el reporte */}
      <ReportConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      />
    </div>
  );
};

export default DetallePropiedad;
