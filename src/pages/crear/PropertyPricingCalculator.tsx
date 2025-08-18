import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyForm } from '../../contexts/PropertyFormContext';
import { propertyService } from '../../services/propertyService';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyPricingCalculator.css';

function PropertyPricingCalculator() {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = usePropertyForm();
  const [basePrice, setBasePrice] = useState(formData.precio_mensual || 850);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBasePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setBasePrice(Math.max(0, value));
  };

  // Cálculos automáticos
  const ubikhaFee = Math.round(basePrice * 0.1); // 10%
  const totalToPay = basePrice + ubikhaFee;
  const netEarnings = basePrice;

  const handleCreate = async () => {
    if (basePrice <= 0) {
      setError('Por favor ingresa un precio válido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Actualizar el precio en el contexto
      updateFormData({ precio_mensual: basePrice });

      // Preparar los datos finales para enviar
      const propertyData = {
        ...formData,
        precio_mensual: basePrice
      };

      console.log('📤 Enviando datos del inmueble:', propertyData);

      // Enviar al backend
      const result = await propertyService.createProperty(propertyData);

      console.log('✅ Inmueble creado:', result);

      // Limpiar el formulario
      resetForm();

      // Mostrar mensaje de éxito y redirigir
      alert(`¡Inmueble creado exitosamente!\n\nID: ${result.id_inmueble}\nTítulo: ${result.titulo}\nPrecio: S/ ${result.precio_mensual}`);
      
      navigate('/mis-anuncios');
    } catch (error: any) {
      console.error('❌ Error al crear el inmueble:', error);
      setError(error.message || 'Error al crear el inmueble. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="price-heading">
        <div className="price-container">
          <div className="price-header">
            <h2 id="price-heading" className="price-main-heading">
              Configura un precio base para los días entre semana
            </h2>
          </div>
          
          <div className="price-config-area">
            {/* Precio base editable */}
            <div className="price-row price-base">
              <div className="price-label">
                <span className="price-icon">💰</span>
                <span>Precio base:</span>
              </div>
              <div className="price-input-wrapper">
                <span className="currency">S/</span>
                <input
                  type="number"
                  value={basePrice}
                  onChange={handleBasePriceChange}
                  className="price-input"
                  min="0"
                  step="10"
                  aria-label="Precio base en soles"
                />
              </div>
            </div>

            {/* Tarifa UBIKHA calculada */}
            <div className="price-row">
              <div className="price-label">
                <span className="price-icon">⚙️</span>
                <span>Tarifa UBIKHA (10%):</span>
              </div>
              <div className="price-value">
                <span className="currency">S/</span>
                <span className="amount">{ubikhaFee}</span>
              </div>
            </div>

            {/* Total a pagar calculado */}
            <div className="price-row price-total">
              <div className="price-label">
                <span className="price-icon">🧾</span>
                <span>Total a pagar inquilino:</span>
              </div>
              <div className="price-value">
                <span className="currency">S/</span>
                <span className="amount">{totalToPay}</span>
              </div>
            </div>

            {/* Ganancias netas calculadas */}
            <div className="price-row price-earnings">
              <div className="price-label">
                <span className="price-icon">💵</span>
                <span>Ganas netas:</span>
              </div>
              <div className="price-value">
                <span className="currency">S/</span>
                <span className="amount">{netEarnings}</span>
              </div>
            </div>
          </div>

          {/* Mostrar error si hay */}
          {error && (
            <div className="error-message" style={{ 
              color: 'red', 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#fee', 
              borderRadius: '8px',
              textAlign: 'center' 
            }}>
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="progress-wrapper">
          <WizardProgressIndicator/>
        </div>
        <div className="footer-buttons">
          <button 
            className="btn-back" 
            onClick={() => navigate('/step3')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleCreate}
            disabled={basePrice <= 0 || isLoading}
            aria-label="Crear anuncio"
          >
            {isLoading ? 'Creando...' : 'Crear anuncio'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyPricingCalculator;