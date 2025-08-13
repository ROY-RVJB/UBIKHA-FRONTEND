import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyLocationForm.css';

interface LocationData {
  direccion: string;
  numero: string;
  zona: string;
  ciudad: string;
  departamento: string;
  pais: string;
  referencias: string;
}

function PropertyLocationForm() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<LocationData>({
    direccion: '',
    numero: '',
    zona: '',
    ciudad: 'Puerto Maldonado',
    departamento: 'Madre de Dios',
    pais: 'Perú',
    referencias: ''
  });

  const handleInputChange = (field: keyof LocationData, value: string) => {
    setLocationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // Validación básica
    if (!locationData.direccion || !locationData.zona) {
      alert('Por favor, completa la dirección y la zona');
      return;
    }
    
    console.log("Datos de ubicación:", locationData);
    navigate('/step1/capacity');
  };

  // Zonas principales de Puerto Maldonado
  const zonasPuertoMaldonado = [
    'Centro',
    'La Joya',
    'El Triunfo',
    'Pueblo Viejo',
    'Pueblo Nuevo',
    'Las Mercedes',
    'Los Cedros',
    'Tambopata',
    'El Bosque',
    'Primero de Mayo',
    'Fitzcarrald',
    'Jorge Chávez',
    'León Velarde',
    'San Francisco',
    'Selva Alegre',
    'El Mirador',
    'Los Castaños',
    'Puerto Nuevo',
    'Dos de Mayo',
    'Santa Rosa'
  ].sort();

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="location-title">
        <div className="location-container">
          <div className="location-header">
            <h2 id="location-title" className="location-main-title">
              ¿Dónde se encuentra tu propiedad?
            </h2>
            <p className="location-description">
              Ingresa la dirección exacta en Puerto Maldonado para que los huéspedes puedan encontrarte fácilmente.
            </p>
          </div>
          
          <div className="location-form">
            <div className="form-group">
              <label htmlFor="direccion" className="form-label">
                Dirección (calle o avenida) *
              </label>
              <input
                type="text"
                id="direccion"
                className="form-input"
                value={locationData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                placeholder="Ej: Av. Larco, Jr. de la Unión"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numero" className="form-label">
                Número / Lote / Manzana
              </label>
              <input
                type="text"
                id="numero"
                className="form-input"
                value={locationData.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                placeholder="Ej: 123, Lote 5, Mz. A"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zona" className="form-label">
                Zona / Barrio *
              </label>
              <select
                id="zona"
                className="form-select"
                value={locationData.zona}
                onChange={(e) => handleInputChange('zona', e.target.value)}
                required
              >
                <option value="">Selecciona una zona</option>
                {zonasPuertoMaldonado.map(zona => (
                  <option key={zona} value={zona}>
                    {zona}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-info">
              <div className="info-item">
                <span className="info-label">Ciudad:</span>
                <span className="info-value">Puerto Maldonado</span>
              </div>
              <div className="info-item">
                <span className="info-label">Departamento:</span>
                <span className="info-value">Madre de Dios</span>
              </div>
              <div className="info-item">
                <span className="info-label">País:</span>
                <span className="info-value">Perú</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="referencias" className="form-label">
                Referencias adicionales
              </label>
              <textarea
                id="referencias"
                className="form-textarea"
                value={locationData.referencias}
                onChange={(e) => handleInputChange('referencias', e.target.value)}
                placeholder="Ej: Frente a la Plaza de Armas, cerca del Mercado Modelo, a dos cuadras del Hospital Santa Rosa..."
                rows={3}
              />
            </div>
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
            onClick={() => navigate('/step1')}
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

export default PropertyLocationForm;