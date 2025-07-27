import React from 'react';
import { Modal, Button } from '../../../ui';
import './CreateAnuncioModal.css';

export interface CreateAnuncioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (tipo: 'casa' | 'departamento' | 'cuarto') => void;
}

export const CreateAnuncioModal: React.FC<CreateAnuncioModalProps> = ({
  isOpen,
  onClose,
  onSelectType
}) => {
  const handleTypeSelect = (tipo: 'casa' | 'departamento' | 'cuarto') => {
    onSelectType(tipo);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Crear nuevo anuncio"
      size="md"
    >
      <div className="create-anuncio-modal">
        <p className="create-anuncio-modal__description">
          Selecciona el tipo de propiedad que deseas publicar:
        </p>
        
        <div className="create-anuncio-modal__options">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleTypeSelect('casa')}
            className="create-anuncio-modal__option"
          >
            <div className="create-anuncio-modal__option-content">
              <span className="create-anuncio-modal__option-icon">🏠</span>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Casa</span>
                <span className="create-anuncio-modal__option-subtitle">
                  Vivienda independiente completa
                </span>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleTypeSelect('departamento')}
            className="create-anuncio-modal__option"
          >
            <div className="create-anuncio-modal__option-content">
              <span className="create-anuncio-modal__option-icon">🏢</span>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Departamento</span>
                <span className="create-anuncio-modal__option-subtitle">
                  Unidad en edificio o condominio
                </span>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleTypeSelect('cuarto')}
            className="create-anuncio-modal__option"
          >
            <div className="create-anuncio-modal__option-content">
              <span className="create-anuncio-modal__option-icon">🚪</span>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Cuarto</span>
                <span className="create-anuncio-modal__option-subtitle">
                  Habitación en vivienda compartida
                </span>
              </div>
            </div>
          </Button>
        </div>

        <div className="create-anuncio-modal__footer">
          <Button 
            variant="ghost" 
            onClick={onClose}
            fullWidth
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};