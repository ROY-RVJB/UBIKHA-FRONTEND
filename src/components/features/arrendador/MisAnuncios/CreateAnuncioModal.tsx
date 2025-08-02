import { LuHouse,LuBuilding,LuDoorClosed } from "react-icons/lu";
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
      size="xl"
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
              <LuHouse className="create-anuncio-modal__option-icon"/>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Casa</span>
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
              <LuBuilding  className="create-anuncio-modal__option-icon"/>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Departamento</span>
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
              <LuDoorClosed className="create-anuncio-modal__option-icon"/>
              <div className="create-anuncio-modal__option-text">
                <span className="create-anuncio-modal__option-title">Cuarto</span>
                
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