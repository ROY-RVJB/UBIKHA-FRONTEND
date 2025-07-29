import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui';
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
}

const DetallePropiedad: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarLightbox, setMostrarLightbox] = useState(false);
  const [mostrarTodasFotos, setMostrarTodasFotos] = useState(false);

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

  return (
    <div className="detalle-propiedad">
      <div className="detalle-propiedad__header">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>

      {/* TÍTULO SOBRE LA GALERÍA */}
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

      {/* GALERÍA */}
      <div className="detalle-propiedad__gallery">
        <div className="gallery-left">
          <img
            src={propertyData.imagenes[imagenActual]}
            alt="Imagen principal"
            className="gallery-main-image"
            onClick={() => {
              setMostrarLightbox(true);
            }}
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

      {/* TODAS LAS FOTOS - GRID COMPLETO */}
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

      <div className="detalle-propiedad__content">
        <div className="detalle-propiedad__info">
          <div className="detalle-propiedad__section">
            <h2>Acerca de este lugar</h2>
            <p>{propertyData.descripcion}</p>
          </div>

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

          {/* NUEVA SECCIÓN - CONOCE AL ARRENDADOR */}
          <div className="detalle-propiedad__section arrendador-layout"> 
            <h2>Conoce al arrendador</h2>

            <div className="arrendador-contenido">
              <div className="arrendador-card">
                <div className="arrendador-user">
                  <i className="fa-regular fa-user fa-4x" style={{ color: '#333' }}></i>
                  <div>
                    <h3>Mark</h3>
                    <p>Se unió en Marzo del 2020</p>
                  </div>
                </div>

                <div className="arrendador-badges">
                  <span><i className="fas fa-star" /> 30 reseñas</span>
                  <span><i className="fas fa-check-circle" /> Identidad verificada</span>
                  <span><i className="fas fa-medal" /> Superarrendador</span>
                </div>

                <button className="btn-outline">Información del arrendador</button>
              </div>

              <div className="arrendador-info">
                <h4>Mark es un Superarrendador</h4>
                <p>
                  Los Superarrendadores tienen mucha experiencia, tienen valoraciones excelentes 
                  y se esfuerzan al máximo para ofrecerles a los huéspedes estadías maravillosas.
                </p>

                <h4>Información sobre el arrendador</h4>
                <p><strong>Índice de respuestas:</strong> 100%</p>
                <p><strong>Tiempo de respuesta:</strong> En menos de una hora</p>
              </div>
            </div>
          </div>

          
        </div>


        <div className="detalle-propiedad__sidebar">
          <div className="detalle-propiedad__contact-card">
            <div className="detalle-propiedad__price">
              <span>S/ {propertyData.precio.toLocaleString('es-PE')}</span>
              <span> por un mes</span>
            </div>
            {propertyData.fechaDisponible && (
              <div className="detalle-propiedad__availability">
                🗓️ Disponible desde{' '}
                {new Date(propertyData.fechaDisponible).toLocaleDateString('es-PE')}
              </div>
            )}
            <Button variant="primary" size="lg" fullWidth>
              Reserva
            </Button>
            <h4>No se hará ningún cargo por el momento</h4>
          </div>
        </div>




      </div>
    </div>
  );
};

export default DetallePropiedad;