import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoBedOutline, IoPeopleOutline } from "react-icons/io5";
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './AccommodationTypeSelector.css';

function AccommodationTypeSelector() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const accommodationOptions = [
    {
      id: 'entire',
      title: 'Un alojamiento entero',
      description: 'Los huéspedes disponen del alojamiento entero para ellos.',
      icon: IoHomeOutline
    },
    {
      id: 'private',
      title: 'Una habitación',
      description: 'Los huéspedes tienen su propia habitación en un alojamiento, más acceso a espacios compartidos.',
      icon: IoBedOutline
    },
    {
      id: 'shared',
      title: 'Una habitación compartida en un hostal',
      description: 'Los huéspedes duermen en una habitación compartida en un hostal administrado por profesionales y con personal disponible 24/7.',
      icon: IoPeopleOutline
    }
  ];

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="form-title">
        <div className="form-container">
          <h2 id="form-title" className="form-main-title">
            ¿De qué tipo de alojamiento dispondrán los huéspedes?
          </h2>
          
          <div className="accommodation-options" role="radiogroup" aria-labelledby="form-title">
            {accommodationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.id}
                  className={`accommodation-option ${selectedOption === option.id ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option.id)}
                  role="radio"
                  aria-checked={selectedOption === option.id}
                  tabIndex={0}
                  style={{ animationDelay: `${(index + 1) * 120}ms` }}
                >
                  <div className="option-icon">
                    <IconComponent />
                  </div>
                  <div className="option-content">
                    <h3 className="option-title">{option.title}</h3>
                    <p className="option-description">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <div className="progress-wrapper">
        <WizardProgressIndicator />
      </div>

      <footer className="footer">
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
            onClick={() => {
              if (selectedOption) {
                navigate('/step1/basic-info');
              }
            }}
            disabled={!selectedOption}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default AccommodationTypeSelector;