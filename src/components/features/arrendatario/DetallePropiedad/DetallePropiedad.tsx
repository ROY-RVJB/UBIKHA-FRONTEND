import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui';
import ReportModal from '../ReportModal/ReportModal';
import GallerySection from '../GallerySection/GallerySection';
import ReservationCard from '../ReservationCard/ReservationCard';
import LandlordSection from '../LandlordSection/LandlordSection';
import PropertyFeatures from '../PropertyFeatures/PropertyFeatures';
import ReportAdLink from '../ReportAdLink/ReportAdLink'; // NUEVO IMPORT: ReportAdLink
import PropertyMap from './PropertyMap/PropertyMap'; // Import the new map component
import './DetallePropiedad.css'; // Mantenemos este CSS para los estilos de layout y otros que no sean de los componentes separados

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
  const [mostrarReportModal, setMostrarReportModal] = useState(false);

  // Datos simulados (se podría reemplazar con una llamada a API real)
  const mockProperties: Property[] = [
    {
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
    },
    {
      id: '2',
      titulo: 'Departamento moderno en el centro',
      tipo: 'departamento',
      precio: 1200,
      imagenes: [
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      ],
      ubicacion: 'Puerto Maldonado Urb. La Joya',
      caracteristicas: [
        { nombre: "3 habitaciones", icono: "door-closed" },
        { nombre: "2 baños", icono: "bath" },
        { nombre: "Balcón", icono: "balcony" },
        { nombre: "Gimnasio", icono: "dumbbell" }
      ],
      calificacion: 4.8,
      fechaDisponible: '2025-09-15',
      descripcion: 'Luminoso y espacioso departamento con vistas a la ciudad, ideal para familias o grupos de amigos.',
      arrendador: {
        nombre: "Ana",
        fechaUnion: "Enero del 2021",
        reseñas: 15,
        verificado: true,
        superArrendador: false,
        indiceRespuestas: 95,
        tiempoRespuesta: "En 2 horas"
      }
    }
  ];

  console.log('ID from useParams:', id);
  const propertyData: Property | undefined = mockProperties.find(p => p.id === id);
  console.log('Property Data found:', propertyData);

  if (!propertyData) {
    // Manejar el caso donde la propiedad no se encuentra, por ejemplo, redirigir a una página 404 o mostrar un mensaje.
    return <div>Propiedad no encontrada.</div>;
  }

  const openReportModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setMostrarReportModal(true);
  };

  const closeReportModal = () => {
    setMostrarReportModal(false);
  };

  const handleReportSubmit = (reason: string) => {
    console.log(`Reportando anuncio por: ${reason}`);
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

      {/* GALERÍA DE IMÁGENES - Ahora se usa el componente GallerySection */}
      <GallerySection imagenes={propertyData.imagenes} />

      {/* CONTENIDO PRINCIPAL */}
      <div className="detalle-propiedad__content">
        <div className="detalle-propiedad__info">
          {/* DESCRIPCIÓN */}
          <div className="detalle-propiedad__section">
            <h2>Acerca de este lugar</h2>
            <p>{propertyData.descripcion}</p>
          </div>

          {/* CARACTERÍSTICAS - Ahora se usa el componente PropertyFeatures */}
          <PropertyFeatures caracteristicas={propertyData.caracteristicas} />

          {/* ARRENDADOR - Ahora se usa el componente LandlordSection */}
          {propertyData.arrendador && (
            <LandlordSection arrendador={propertyData.arrendador} />
          )}

          {/* MAPA DE UBICACIÓN */}
          <div className="detalle-propiedad__section">
            <h2>Ubicación</h2>
            <div className="property-map-container">
              <PropertyMap
                latitude={-12.59}
                longitude={-69.19}
                locationGroups={[{ title: "Ubicación de la Propiedad", locations: [propertyData.ubicacion] }]}
                zoom={14}
              />
            </div>
          </div>
        </div>

        {/* TARJETA DE RESERVA Y REPORTE (STICKY CONTAINER) */}
        <div className="detalle-propiedad__sidebar">
          <div className="sidebar-sticky-container">
            {/* Tarjeta de Reserva - Ahora se usa el componente ReservationCard */}
            <ReservationCard
              precio={propertyData.precio}
              calificacion={propertyData.calificacion}
              fechaDisponible={propertyData.fechaDisponible}
            />
            {/* Botón de Reporte - Ahora se usa el componente ReportAdLink */}
            <ReportAdLink openReportModal={openReportModal} />
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
