import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyForm } from '../../contexts/PropertyFormContext';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import NumericCounter from '../crear/componenteCrear/NumericCounter';
import './PropertyCapacityForm.css';

interface SpaceData {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

function PropertyCapacityForm() {
  const navigate = useNavigate();
  const { formData, updateFormData } = usePropertyForm();
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [spaceData, setSpaceData] = useState<SpaceData>({
    guests: formData.huespedes || 0,
    bedrooms: formData.habitaciones || 0,
    beds: formData.camas || 0,
    bathrooms: formData.banos || 0
  });

  useEffect(() => {
    // Cargar el tipo de propiedad desde localStorage
    const savedType = localStorage.getItem('propertyType');
    setPropertyType(savedType);
    
    // Actualizar el tipo de inmueble en el contexto
    if (savedType) {
      updateFormData({ 
        tipo_inmueble: savedType as 'casa' | 'departamento' | 'cuarto' 
      });
    }
  }, []);

  const updateCount = (field: keyof SpaceData, value: number) => {
    setSpaceData(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }));
  };

  const handleNext = () => {
    // Guardar en el contexto con los nombres correctos para el backend
    updateFormData({
      huespedes: spaceData.guests,
      habitaciones: spaceData.bedrooms,
      camas: spaceData.beds,
      banos: spaceData.bathrooms
    });
    
    console.log("Datos del espacio guardados:", spaceData);
    navigate('/step2');
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="space-title">
        <div className="space-container">
          <div className="space-header">
            <h2 id="space-title" className="space-main-title">
              Agrega algunos datos básicos sobre tu espacio
            </h2>
            <p className="space-description">
              Después podrás agregar más información, como los tipos de cama.
            </p>
          </div>
          
          <div className="counters-grid">
            <NumericCounter
              label="Huéspedes"
              value={spaceData.guests}
              onChange={(value) => updateCount('guests', value)}
              min={0}
              max={16}
            />
            
            <NumericCounter
              label="Habitaciones"
              value={spaceData.bedrooms}
              onChange={(value) => updateCount('bedrooms', value)}
              min={0}
              max={10}
              disabled={propertyType === 'cuarto'}
            />
            
            <NumericCounter
              label="Camas"
              value={spaceData.beds}
              onChange={(value) => updateCount('beds', value)}
              min={0}
              max={16}
            />
            
            <NumericCounter
              label="Baños"
              value={spaceData.bathrooms}
              onChange={(value) => updateCount('bathrooms', value)}
              min={0}
              max={propertyType === 'cuarto' ? 1 : 10}
            />
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
            onClick={() => navigate('/step1/location')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleNext}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyCapacityForm;