import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWifi, FaParking, FaTv, FaSnowflake, FaPaw } from 'react-icons/fa';
import { MdKitchen, MdLocalLaundryService } from 'react-icons/md';
import { BsCameraVideoFill } from 'react-icons/bs';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyAmenitiesSelector.css';

interface Amenity {
  id: string;
  name: string;
  icon: React.ComponentType;
}

function PropertyAmenitiesSelector() {
  const navigate = useNavigate();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Todas las comodidades disponibles
  const amenities: Amenity[] = [
    { id: 'wifi', name: 'Wi-Fi', icon: FaWifi },
    { id: 'kitchen', name: 'Cocina', icon: MdKitchen },
    { id: 'parking', name: 'Estacionamiento', icon: FaParking },
    { id: 'tv', name: 'Televisión', icon: FaTv },
    { id: 'ac', name: 'Aire acondicionado', icon: FaSnowflake },
    { id: 'laundry', name: 'Servicio de lavandería', icon: MdLocalLaundryService },
    { id: 'security_camera', name: 'Cámara de seguridad', icon: BsCameraVideoFill },
    { id: 'pets', name: 'Mascotas', icon: FaPaw },
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenityId)) {
        return prev.filter(id => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  const handleNext = () => {
    console.log("Comodidades seleccionadas:", selectedAmenities);
    navigate('/step2/photos');
  };


  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="amenities-title">
        <div className="amenities-container">
          <div className="amenities-header">
            <h2 id="amenities-title" className="amenities-main-title">
              Cuéntale a los huéspedes todo lo que tu espacio tiene para ofrecer
            </h2>
            <p className="amenities-description">
              Puedes agregar más comodidades una vez que publiques el anuncio.
            </p>
          </div>
          
          <div className="amenities-content">
            <div className="amenities-grid">
              {amenities.map((amenity) => {
                const IconComponent = amenity.icon;
                return (
                  <button
                    key={amenity.id}
                    className={`amenity-card ${selectedAmenities.includes(amenity.id) ? 'selected' : ''}`}
                    onClick={() => toggleAmenity(amenity.id)}
                    type="button"
                    aria-pressed={selectedAmenities.includes(amenity.id)}
                  >
                    <div className="amenity-icon">
                      <IconComponent />
                    </div>
                    <span className="amenity-name">{amenity.name}</span>
                    <div className="amenity-checkbox">
                      {selectedAmenities.includes(amenity.id) && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="currentColor"/>
                          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="selected-count">
            {selectedAmenities.length > 0 ? (
              <span>{selectedAmenities.length} comodidades seleccionadas</span>
            ) : (
              <span>Selecciona al menos las comodidades básicas</span>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="progress-wrapper">
          <WizardProgressIndicator />
        </div>
        <div className="footer-buttons">
          <button 
            className="btn-back" 
            onClick={() => navigate('/step2')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleNext}
            aria-label="Continuar al siguiente paso"
            disabled={selectedAmenities.length === 0}
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyAmenitiesSelector;