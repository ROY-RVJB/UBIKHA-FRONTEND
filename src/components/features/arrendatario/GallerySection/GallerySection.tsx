// src/arrendatario/GallerySection/GallerySection.tsx
import React, { useState } from 'react';
import './GallerySection.css'; // Importa el CSS específico para GallerySection

interface GallerySectionProps {
  imagenes: string[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ imagenes }) => {
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarLightbox, setMostrarLightbox] = useState(false);
  const [mostrarTodasFotos, setMostrarTodasFotos] = useState(false);

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
    <>
      <div className="gallery-section"> {/* Usamos una clase más específica para este componente */}
        <div className="gallery-left">
          <img
            src={imagenes[imagenActual]}
            alt="Imagen principal"
            className="gallery-main-image"
            onClick={() => setMostrarLightbox(true)}
          />
          <div className="show-all-photos-btn" onClick={toggleTodasFotos}>
            <span className="photos-icon">📷</span> Mostrar todas las fotos ({imagenes.length})
          </div>
        </div>
        <div className="gallery-right">
          {imagenes
            .filter((_, index) => index !== imagenActual)
            .slice(0, 4)
            .map((img, index) => (
              <div
                className="gallery-thumb"
                key={index}
                onClick={() => cambiarImagenPrincipal(imagenes.indexOf(img))}
              >
                <img src={img} alt={`Miniatura ${index + 1}`} />
              </div>
            ))}
        </div>
      </div>

      {mostrarTodasFotos && (
        <div className="todas-fotos-overlay">
          <div className="todas-fotos-container">
            <div className="todas-fotos-header">
              <h2>Todas las fotos ({imagenes.length})</h2>
              <button onClick={toggleTodasFotos} className="todas-fotos-close">
                &times;
              </button>
            </div>
            <div className="todas-fotos-grid">
              {imagenes.map((img, index) => (
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

      {mostrarLightbox && (
        <div className="lightbox" onClick={toggleLightbox}>
          <div className="lightbox-content">
            <img
              src={imagenes[imagenActual]}
              alt={`Vista ampliada ${imagenActual + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightbox-navigation">
              <button
                className="lightbox-nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === 0 ? imagenes.length - 1 : prev - 1
                  );
                }}
              >
                &lt;
              </button>
              <span className="lightbox-counter">
                {imagenActual + 1} / {imagenes.length}
              </span>
              <button
                className="lightbox-nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === imagenes.length - 1 ? 0 : prev + 1
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
    </>
  );
};

export default GallerySection;