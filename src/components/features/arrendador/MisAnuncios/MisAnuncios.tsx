import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, RetractableSearch } from '../../../ui';
import { AnuncioCard, type Anuncio } from './AnuncioCard';
import { AnuncioTableRow } from './AnuncioTableRow';
import { CreateAnuncioModal } from './CreateAnuncioModal';
import { propertyService, type Property } from '../../../../services/propertyService';
import './MisAnuncios.css';

// Mock data temporal para demostración (se usará como fallback)
const mockAnuncios: Anuncio[] = [
  {
    id: '1',
    titulo: 'Casa moderna en Miraflores',
    tipo: 'casa',
    estado: 'activo',
    precio: 2500,
    fechaCreacion: new Date('2024-01-15'),
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    ubicacion: 'Miraflores, Lima'
  },
  {
    id: '2', 
    titulo: 'Departamento céntrico San Isidro',
    tipo: 'departamento',
    estado: 'accion_necesaria',
    precio: 1800,
    fechaCreacion: new Date('2024-01-20'),
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    ubicacion: 'San Isidro, Lima'
  },
  {
    id: '3',
    titulo: 'Cuarto acogedor en Barranco',
    tipo: 'cuarto', 
    estado: 'pendiente_aprobacion',
    precio: 800,
    fechaCreacion: new Date('2024-01-25'),
    imageUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    ubicacion: 'Barranco, Lima'
  },
  {
    id: '4',
    titulo: 'Casa familiar en Surco',
    tipo: 'casa',
    estado: 'pausado',
    precio: 3200,
    fechaCreacion: new Date('2024-01-10'),
    imageUrl: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg', 
    ubicacion: 'Santiago de Surco, Lima'
  },
   {
    id: '5',
    titulo: 'Casa moderna en Miraflores',
    tipo: 'casa',
    estado: 'activo',
    precio: 2500,
    fechaCreacion: new Date('2024-01-15'),
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    ubicacion: 'Miraflores, Lima'
  },
  {
    id: '6', 
    titulo: 'Departamento céntrico San Isidro',
    tipo: 'departamento',
    estado: 'accion_necesaria',
    precio: 1800,
    fechaCreacion: new Date('2024-01-20'),
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    ubicacion: 'San Isidro, Lima'
  },
  {
    id: '7',
    titulo: 'Cuarto acogedor en Barranco',
    tipo: 'cuarto', 
    estado: 'pendiente_aprobacion',
    precio: 800,
    fechaCreacion: new Date('2024-01-25'),
    imageUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    ubicacion: 'Barranco, Lima'
  },
  {
    id: '8',
    titulo: 'Casa familiar en Surco',
    tipo: 'casa',
    estado: 'pausado',
    precio: 3200,
    fechaCreacion: new Date('2024-01-10'),
    imageUrl: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg', 
    ubicacion: 'Santiago de Surco, Lima'
  }
];

export const MisAnuncios: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar inmuebles del backend
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const properties = await propertyService.getProperties();
        
        // Log para ver qué devuelve el backend
        console.log('📦 Inmuebles recibidos del backend:', properties);
        if (properties.length > 0) {
          console.log('📝 Estructura del primer inmueble:', properties[0]);
        }
        
        // Convertir las propiedades del backend al formato de Anuncio con validaciones
        const convertedAnuncios: Anuncio[] = properties.map((property: Property, index: number) => {
          console.log(`🏠 Procesando inmueble ${index + 1}:`, property);
          
          // Validar y manejar campos que podrían ser undefined
          const anuncio: Anuncio = {
            id: property.id_inmueble ? property.id_inmueble.toString() : `temp-${index}`,
            titulo: property.titulo || 'Sin título',
            tipo: property.tipo_inmueble || 'casa',
            estado: property.estado || 'activo', // Usar directamente el estado del backend
            precio: property.precio_mensual || 0,
            fechaCreacion: property.fecha_creacion ? new Date(property.fecha_creacion) : new Date(),
            imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', // Imagen por defecto
            ubicacion: property.direccion || 'Sin dirección especificada'
          };
          
          console.log(`✅ Anuncio convertido:`, anuncio);
          return anuncio;
        });
        
        setAnuncios(convertedAnuncios);
        console.log(`✅ Se cargaron ${convertedAnuncios.length} inmuebles del backend`);
        
      } catch (error: any) {
        console.error('❌ Error cargando inmuebles:', error);
        setError(error.message || 'Error al cargar los inmuebles');
        
        // Si hay error, usar datos mock como fallback
        if (error.message?.includes('No hay token')) {
          console.log('⚠️ Usuario no autenticado, mostrando datos de ejemplo');
          setAnuncios(mockAnuncios);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Filtrar anuncios por búsquedaa
  const filteredAnuncios = anuncios.filter(anuncio =>
    anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anuncio.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas básicas
  const estadisticas = {
    total: anuncios.length,
    activos: anuncios.filter(a => a.estado === 'activo').length,
    enRevision: anuncios.filter(a => a.estado === 'en revisión').length,
    pausados: anuncios.filter(a => a.estado === 'pausado').length,
    rechazados: anuncios.filter(a => a.estado === 'rechazado').length
  };

  const handleCreateAnuncio = () => {
    setShowCreateModal(true);
  };

  const handleToggleViewMode = () => {
    // Cambiar vista entre grid y filas
    setViewMode(prev => prev === 'grid' ? 'rows' : 'grid');
  };  

  const handleTypeSelect = (tipo: 'casa' | 'departamento' | 'cuarto') => {
    navigate(`/crear-anuncio/${tipo}`)
    
    
  };

  const handleEditAnuncio = (id: string) => {
    // Navegar a página de edición (por implementar)
    navigate(`/editar-anuncio/${id}`);
  };

  const handleToggleStatus = (id: string) => {
    // Por implementar: cambiar estado del anuncio
    console.log(`Toggle status para anuncio: ${id}`);
  };

  const handleViewDetails = (id: string) => {
    // Por implementar: ver detalles del anuncio
    console.log(`Ver detalles de anuncio: ${id}`);
  };

  return (
    <div className="mis-anuncios">
      {/* Header con buscador integrado */}
      <div className="mis-anuncios__header">
        <div className="mis-anuncios__title-section">
          <h1 className="mis-anuncios__title">Tus anuncios</h1>
          <p className="mis-anuncios__subtitle">
            Gestiona tus propiedades publicadas
          </p>
        </div>
        
        {/* Buscador retráctil en el header */}
        <div className="mis-anuncios__search-header">
          <RetractableSearch
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar mis anuncios..."
            size="lg"
            variant="primary"
          />
        </div>
        
        {/* Botones de acción - solo visibles en desktop */}
        <div className="mis-anuncios__desktop-actions">
          <IconButton 
            icon="rows"
            onClick={handleToggleViewMode}
            variant={viewMode === 'rows' ? 'primary' :'primary' }
            size="lg"
            tooltip={viewMode === 'grid' ? 'Vista en filas' : 'Vista en cuadrícula'}
          />
          
          <IconButton 
            icon="plus"
            onClick={handleCreateAnuncio}
            variant="primary"
            size="lg"
            shape="circle"
            tooltip="Crear nuevo anuncio"
          />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mis-anuncios__stats">
        <div className="stat-card">
          <span className="stat-card__number">{estadisticas.total}</span>
          <span className="stat-card__label">Total</span>
        </div>
        <div className="stat-card stat-card--active">
          <span className="stat-card__number">{estadisticas.activos}</span>
          <span className="stat-card__label">Activos</span>
        </div>
        <div className="stat-card stat-card--pending">
          <span className="stat-card__number">{estadisticas.enRevision}</span>
          <span className="stat-card__label">En revisión</span>
        </div>
        <div className="stat-card stat-card--paused">
          <span className="stat-card__number">{estadisticas.pausados}</span>
          <span className="stat-card__label">Pausados</span>
        </div>
        <div className="stat-card stat-card--warning">
          <span className="stat-card__number">{estadisticas.rechazados}</span>
          <span className="stat-card__label">Rechazados</span>
        </div>
      </div>

      {/* Lista de anuncios */}
      <div className="mis-anuncios__content">
        {isLoading ? (
          <div className="mis-anuncios__loading" style={{ textAlign: 'center', padding: '40px' }}>
            <p>Cargando tus inmuebles...</p>
          </div>
        ) : error && anuncios.length === 0 ? (
          <div className="mis-anuncios__error" style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
            <p>{error}</p>
            <div style={{ marginTop: '16px' }}>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
            </div>
          </div>
        ) : filteredAnuncios.length > 0 ? (
          <div className={`mis-anuncios__grid mis-anuncios__grid--${viewMode}`}>
            {viewMode === 'grid' ? (
              // Vista en cuadrícula (cards)
              filteredAnuncios.map((anuncio) => (
                <AnuncioCard
                  key={anuncio.id}
                  anuncio={anuncio}
                  onEdit={handleEditAnuncio}
                  onToggleStatus={handleToggleStatus}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              // Vista en tabla (filas) - Desktop | Cards - Móvil
              <>
                <table className="mis-anuncios__table">
                  <thead className="mis-anuncios__table-header">
                    <tr>
                      <th>Anuncio</th>
                      <th>Tipo</th>
                      <th>Ubicación</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnuncios.map((anuncio) => (
                      <AnuncioTableRow
                        key={anuncio.id}
                        anuncio={anuncio}
                        onEdit={handleEditAnuncio}
                        onToggleStatus={handleToggleStatus}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </tbody>
                </table>
                
                {/* Fallback para móvil */}
                <div className="mis-anuncios__mobile-rows">
                  {filteredAnuncios.map((anuncio) => (
                    <AnuncioCard
                      key={`mobile-${anuncio.id}`}
                      anuncio={anuncio}
                      onEdit={handleEditAnuncio}
                      onToggleStatus={handleToggleStatus}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mis-anuncios__empty">
            {searchTerm ? (
              <div className="empty-state">
                <span className="empty-state__icon">🔍</span>
                <h3 className="empty-state__title">
                  No se encontraron anuncios
                </h3>
                <p className="empty-state__description">
                  No hay anuncios que coincidan con "{searchTerm}"
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </Button>
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state__icon">📝</span>
                <h3 className="empty-state__title">
                  Aún no tienes anuncios
                </h3>
                <p className="empty-state__description">
                  Crea tu primer anuncio para comenzar a alquilar tu propiedad
                </p>
                <Button 
                  variant="primary" 
                  onClick={handleCreateAnuncio}
                >
                  + Crear mi primer anuncio
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de creación */}
      <CreateAnuncioModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSelectType={handleTypeSelect}
      />
      
      {/* Botones flotantes para móvil */}
      <div className="mis-anuncios__mobile-actions">
        <IconButton 
          icon="plus"
          onClick={handleCreateAnuncio}
          variant="primary"
          size="lg"
          shape="circle"
          tooltip="Crear anuncio"
        />
      </div>
    </div>
  );
};