import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui';
import ReportModal from '../ReportModal/ReportModal'; // IMPORT THE NEW MODAL COMPONENT
import './DetallePropiedad.css';

interface Property {
  id: string;
  titulo: string;
  tipo: 'casa' | 'departamento' | 'cuarto' | 'oficina';
  precio: number;
  imagenes: string[];
  ubicacion: string;
  caracteristicas: {
    nombre: string;
    icono: string;
  }[];
  calificacion?: number;
  fechaDisponible?: string;
  descripcion?: string;
  arrendador?: {
    nombre: string;
    fechaUnion: string;
    reseñas: number;
    verificado: boolean;
    superArrendador: boolean;
    indiceRespuestas: number;
    tiempoRespuesta: string;
  };
}

const DetallePropiedad: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarLightbox, setMostrarLightbox] = useState(false);
  const [mostrarTodasFotos, setMostrarTodasFotos] = useState(false);
  const [mostrarReportModal, setMostrarReportModal] = useState(false); // Only this state remains for the modal

  // Datos simulados
  const propertyData: Property = {
    id: '1',
    titulo: 'Casa familiar con jardín',
    tipo: 'casa',
    precio: 800,
    imagenes: [
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
      'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
      'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg',
      'https://images.pexels.com/photos/7031617/pexels-photo-7031617.jpeg',
      'https://images.pexels.com/photos/7031619/pexels-photo-7031619.jpeg',
    ],
    ubicacion: 'Puerto Maldonado Centro',
    caracteristicas: [
      { nombre: "2 habitaciones", icono: "door-closed" },
      { nombre: "1 baño", icono: "bath" },
      { nombre: "Jardín", icono: "tree" },
      { nombre: "Cocina equipada", icono: "utensils" },
      { nombre: "Sala de estar", icono: "couch" },
      { nombre: "Amueblado", icono: "chair" },
      { nombre: "Agua caliente", icono: "faucet-drip" },
      { nombre: "Internet incluido", icono: "wifi" }
    ],
    calificacion: 4.5,
    fechaDisponible: '2025-08-01',
    descripcion: 'Hermosa casa familiar ubicada en el corazón de Puerto Maldonado, perfecta para estudiantes o profesionales. Cuenta con amplios espacios y áreas verdes.',
    arrendador: {
      nombre: "Mark",
      fechaUnion: "Marzo del 2020",
      reseñas: 30,
      verificado: true,
      superArrendador: true,
      indiceRespuestas: 100,
      tiempoRespuesta: "En menos de una hora"
    }
  };

  const toggleLightbox = () => {
    setMostrarLightbox(!mostrarLightbox);
  };

  const toggleTodasFotos = () => {
    setMostrarTodasFotos(!mostrarTodasFotos);
  };

  const cambiarImagenPrincipal = (index: number) => {
    setImagenActual(index);
  };

  const openReportModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setMostrarReportModal(true);
  };

  const closeReportModal = () => {
    setMostrarReportModal(false);
  };

  const handleReportSubmit = (reason: string) => {
    console.log(`Reportando anuncio por: ${reason}`);
    // Here you would typically send the report data to your backend API
    // Example: sendReportApi(propertyData.id, reason);
    alert(`Anuncio reportado: ${reason}`);
    closeReportModal();
  };

  return (
    <div className="detalle-propiedad">
      <div className="detalle-propiedad__header">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>

      {/* TÍTULO Y METADATOS */}
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

      {/* GALERÍA DE IMÁGENES */}
      <div className="detalle-propiedad__gallery">
        <div className="gallery-left">
          <img
            src={propertyData.imagenes[imagenActual]}
            alt="Imagen principal"
            className="gallery-main-image"
            onClick={() => setMostrarLightbox(true)}
          />
          <div className="show-all-photos-btn" onClick={toggleTodasFotos}>
            <span className="photos-icon">📷</span> Mostrar todas las fotos ({propertyData.imagenes.length})
          </div>
        </div>
        <div className="gallery-right">
          {propertyData.imagenes
            .filter((_, index) => index !== imagenActual)
            .slice(0, 4)
            .map((img, index) => (
              <div
                className="gallery-thumb"
                key={index}
                onClick={() => cambiarImagenPrincipal(propertyData.imagenes.indexOf(img))}
              >
                <img src={img} alt={`Miniatura ${index + 1}`} />
              </div>
            ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {mostrarLightbox && (
        <div className="lightbox" onClick={toggleLightbox}>
          <div className="lightbox-content">
            <img
              src={propertyData.imagenes[imagenActual]}
              alt={`Vista ampliada ${imagenActual + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightbox-navigation">
              <button
                className="lightbox-nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === 0 ? propertyData.imagenes.length - 1 : prev - 1
                  );
                }}
              >
                &lt;
              </button>
              <span className="lightbox-counter">
                {imagenActual + 1} / {propertyData.imagenes.length}
              </span>
              <button
                className="lightbox-nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === propertyData.imagenes.length - 1 ? 0 : prev + 1
                  );
                }}
              >
                &gt;
              </button>
            </div>
            <button
              className="lightbox-close"
              onClick={toggleLightbox}
              aria-label="Cerrar lightbox"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* GRID COMPLETO DE FOTOS */}
      {mostrarTodasFotos && (
        <div className="todas-fotos-overlay">
          <div className="todas-fotos-container">
            <div className="todas-fotos-header">
              <h2>Todas las fotos ({propertyData.imagenes.length})</h2>
              <button onClick={toggleTodasFotos} className="todas-fotos-close">
                &times;
              </button>
            </div>
            <div className="todas-fotos-grid">
              {propertyData.imagenes.map((img, index) => (
                <div
                  className={`todas-fotos-item ${index === imagenActual ? 'active' : ''}`}
                  key={index}
                  onClick={() => {
                    cambiarImagenPrincipal(index);
                    setMostrarTodasFotos(false);
                    setMostrarLightbox(true);
                  }}
                >
                  <img src={img} alt={`Foto ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="detalle-propiedad__content">
        <div className="detalle-propiedad__info">
          {/* DESCRIPCIÓN */}
          <div className="detalle-propiedad__section">
            <h2>Acerca de este lugar</h2>
            <p>{propertyData.descripcion}</p>
          </div>

          {/* CARACTERÍSTICAS */}
          <div className="detalle-propiedad__section">
            <h2>Lo que este lugar ofrece</h2>
            <div className="detalle-propiedad__features">
              {propertyData.caracteristicas.map((feature, index) => (
                <div key={index} className="detalle-propiedad__feature">
                  <i className={`fas fa-${feature.icono}`}></i>
                  <span>{feature.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ARRENDADOR */}
          {propertyData.arrendador && (
            <div className="detalle-propiedad__section arrendador-layout">
              <h2>Conoce al arrendador</h2>
              <div className="arrendador-contenido">
                <div className="arrendador-card">
                  <div className="arrendador-user">
                    <i className="fa-regular fa-user fa-4x" style={{ color: '#333' }}></i>
                    <div>
                      <h3>{propertyData.arrendador.nombre}</h3>
                      <p>Se unió en {propertyData.arrendador.fechaUnion}</p>
                    </div>
                  </div>

                  <div className="arrendador-badges">
                    <span><i className="fas fa-star" /> {propertyData.arrendador.reseñas} reseñas</span>
                    <span><i className="fas fa-check-circle" /> Identidad verificada</span>
                    {propertyData.arrendador.superArrendador && (
                      <span><i className="fas fa-medal" /> Superarrendador</span>
                    )}
                  </div>

                  <button className="btn-outline">Información del arrendador</button>
                </div>

                <div className="arrendador-info">
                  <h4>{propertyData.arrendador.nombre} es un Superarrendador</h4>
                  <p>
                    Los Superarrendadores tienen mucha experiencia, tienen valoraciones excelentes
                    y se esfuerzan al máximo para ofrecerles a los huéspedes estadías maravillosas.
                  </p>

                  <h4>Información sobre el arrendador</h4>
                  <p><strong>Índice de respuestas:</strong> {propertyData.arrendador.indiceRespuestas}%</p>
                  <p><strong>Tiempo de respuesta:</strong> {propertyData.arrendador.tiempoRespuesta}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TARJETA DE RESERVA Y REPORTE (STICKY CONTAINER) */}
        <div className="detalle-propiedad__sidebar">
          <div className="sidebar-sticky-container">
            <div className="reserva-card">
              <div className="reserva-top-row">
                <div className="reserva-precio">
                  <span className="precio-monto">S/ {propertyData.precio.toLocaleString('es-PE')}</span>
                  <span className="precio-periodo">/ mes</span>
                </div>

                {propertyData.calificacion && (
                  <div className="reserva-rating">
                    <i className="fas fa-star estrella-icono"></i>
                    <span className="rating-num">{propertyData.calificacion.toFixed(1)}</span>
                    <span className="reseñas">
                      · <a href="#opiniones">7 reseñas</a>
                    </span>
                  </div>
                )}
              </div>

              {propertyData.fechaDisponible && (
                <div className="detalle-propiedad__availability">
                  🗓️ Disponible desde {new Date(propertyData.fechaDisponible).toLocaleDateString('es-PE')}
                </div>
              )}

              <div className="reserva-garantia">
                Pago con garantía: + S/ {propertyData.precio.toLocaleString('es-PE')}
              </div>

              <Button variant="primary" size="lg" fullWidth className="btn-reserva">
                Reserva
              </Button>

              <div className="reserva-nota">
                No se hará ningún cargo por el momento
              </div>
            </div>
            <div className="report-ad">
              <i className="fa-regular fa-flag"></i>
              <a href="#" onClick={openReportModal}>Reporta este anuncio</a>
            </div>
          </div>
        </div>
      </div>

      {/* Render the ReportModal component */}
      <ReportModal
        isOpen={mostrarReportModal}
        onClose={closeReportModal}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default DetallePropiedad;