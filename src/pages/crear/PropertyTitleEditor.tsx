import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyTitleEditor.css';

function PropertyTitleEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleNext = () => {
    if (title.trim()) {
      console.log("Título ingresado:", title.trim());
      navigate('/step2/description');
    }
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="title-heading">
        <div className="title-container">
          <div className="title-header">
            <h2 id="title-heading" className="title-main-heading">
              Ahora, ponle un título a tu casa
            </h2>
            <p className="title-description">
              Los títulos cortos funcionan mejor. No te preocupes, puedes modificarlo más adelante.
            </p>
          </div>
          
          <div className="title-input-area">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Ej: Hermoso apartamento en el centro"
              className="title-input"
              maxLength={50}
              aria-label="Título de tu propiedad"
              autoFocus
            />
            <div className="character-count">
              {title.length}/50
            </div>
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
            onClick={() => navigate('/step2/photos')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleNext}
            disabled={!title.trim()}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyTitleEditor;