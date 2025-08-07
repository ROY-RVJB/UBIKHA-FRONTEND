import React, { useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './RegisterStepOne.css';

export interface RegisterStepOneProps {
  onNext: (data: { num_celular: string }) => void;
  onBack: () => void;
  initialData?: { num_celular: string };
}

export const RegisterStepOne: React.FC<RegisterStepOneProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialData?.num_celular || '');
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone: string): boolean => {
    // Regex para números de Perú (9 dígitos, empezando con 9)
    const phoneRegex = /^9\d{8}$/;
    
    if (!phone) {
      setPhoneError('El número de celular es requerido');
      return false;
    }
    
    // Eliminar espacios y caracteres no numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError('Ingresa un número válido (9 dígitos)');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePhone(phoneNumber)) {
      // Limpiar el número antes de enviarlo
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      onNext({ num_celular: cleanPhone });
    }
  };

  return (
    <div className="register-step-one">
      <div className="register-step-one__container">
        {/* Header con flecha de retroceso */}
        <div className="register-step-one__header">
          <button 
            className="register-step-one__back-button"
            onClick={onBack}
            type="button"
            aria-label="Volver"
          >
            <IoArrowBack size={24} />
          </button>
          <h2 className="register-step-one__title">Registrarse</h2>
          <div className="register-step-one__spacer"></div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-step-one__form">
          <div className="register-step-one__input-section">
            <label className="register-step-one__label">
              Número de teléfono
            </label>
            <Input
              type="tel"
              placeholder="Número telefónico"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                // Limpiar error cuando el usuario empiece a escribir
                if (phoneError) setPhoneError('');
              }}
              error={!!phoneError}
              errorMessage={phoneError}
              maxLength={9}
              name="phone"
            />
          </div>

          {/* Divider con "o" */}
          <div className="register-step-one__divider">
            <span className="register-step-one__divider-line"></span>
            <span className="register-step-one__divider-text">o</span>
            <span className="register-step-one__divider-line"></span>
          </div>

          {/* Botones de redes sociales */}
          <div className="register-step-one__social-buttons">
            <button 
              type="button"
              className="register-step-one__social-button register-step-one__social-button--google"
              disabled={true}
              title="Próximamente"
            >
              <FcGoogle size={24} />
            </button>
            
            <button 
              type="button"
              className="register-step-one__social-button register-step-one__social-button--facebook"
              disabled={true}
              title="Próximamente"
            >
              <FaFacebookF size={20} />
            </button>
          </div>

          {/* Botón de continuar */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
          >
            Aceptar y continuar
          </Button>
        </form>
      </div>
    </div>
  );
};
