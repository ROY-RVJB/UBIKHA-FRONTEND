import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCameraRetro, FaTimes } from "react-icons/fa";
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyPhotoUploader.css';

function PropertyPhotoUploader() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{file: File, url: string}>>([]);

  const handleAddPhotos = () => {
    if (uploadedPhotos.length >= 5) {
      alert("Máximo 5 fotos permitidas");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const remainingSlots = 5 - uploadedPhotos.length;
    
    if (filesArray.length > remainingSlots) {
      alert(`Solo puedes agregar ${remainingSlots} foto(s) más. Máximo 5 fotos.`);
      return;
    }

    // Crear URLs para las imágenes
    const newPhotos = filesArray.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setUploadedPhotos(prev => [...prev, ...newPhotos]);
    
    // Limpiar el input
    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => {
      const newPhotos = [...prev];
      // Limpiar la URL del objeto para liberar memoria
      URL.revokeObjectURL(newPhotos[index].url);
      newPhotos.splice(index, 1);
      return newPhotos;
    });
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="photo-title">
        <div className="photo-container">
          <div className="photo-header">
            <h2 id="photo-title" className="photo-main-title">
              Agrega algunas fotos de tu inmueble
            </h2>
            <p className="photo-description">
              Para empezar, necesitarás cinco fotos. Después podrás agregar más o hacer cambios.
            </p>
          </div>
          
          <div className="photo-upload-area">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              aria-label="Seleccionar archivos de imagen"
            />
            
            {uploadedPhotos.length === 0 ? (
              <button 
                className="btn-add-photos"
                onClick={handleAddPhotos}
                aria-label="Agregar fotos de tu inmueble"
              >
                <div className="btn-icon">
                  <FaCameraRetro />
                </div>
                <span className="btn-text">Agregar fotos</span>
              </button>
            ) : (
              <>
                <div className="photos-grid">
                  {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img 
                        src={photo.url} 
                        alt={`Foto ${index + 1}`}
                        className="photo-preview"
                      />
                      <button
                        className="btn-remove-photo"
                        onClick={() => removePhoto(index)}
                        aria-label={`Eliminar foto ${index + 1}`}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
                
                {uploadedPhotos.length < 5 && (
                  <button 
                    className="btn-add-more"
                    onClick={handleAddPhotos}
                    aria-label="Agregar más fotos"
                  >
                    <FaCameraRetro />
                    <span>Agregar más fotos ({uploadedPhotos.length}/5)</span>
                  </button>
                )}
              </>
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
            onClick={() => navigate('/step2/amenities')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={() => {
              if (uploadedPhotos.length > 0) {
                console.log(`Continuar con ${uploadedPhotos.length} foto(s)`);
              } else {
                console.log("Continuar sin fotos");
              }
              navigate('/step2/title');
            }}
            aria-label="Continuar al siguiente paso"
          >
            {uploadedPhotos.length > 0 ? 'Siguiente' : 'Omitir por ahora'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyPhotoUploader;