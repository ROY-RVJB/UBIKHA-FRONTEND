import React, { useState, useRef, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Button } from '../Button/Button';
import './RegisterStepTwo.css';

export interface RegisterStepTwoProps {
  onNext: (data: { verification_code: string }) => void;
  onBack: () => void;
  phoneNumber?: string; // Para mostrar el número al que se envió el código
}

export const RegisterStepTwo: React.FC<RegisterStepTwoProps> = ({
  onNext,
  onBack,
  phoneNumber
}) => {
  // Estado para cada dígito del código
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  
  // Referencias para cada input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus en el primer input al montar
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Maneja el cambio en cada input
  const handleChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');

    // Auto-avanzar al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Si se completaron todos los dígitos, habilitar el botón
    if (index === 5 && value) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        console.log('Código completo:', fullCode);
      }
    }
  };

  // Maneja el backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Si el campo actual está vacío y presiona backspace, ir al anterior
        inputRefs.current[index - 1]?.focus();
      } else {
        // Limpiar el campo actual
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    } else if (e.key === 'Enter') {
      // Intentar enviar el formulario con Enter
      handleSubmit(e as any);
    }
  };

  // Maneja el pegado de código completo
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Solo tomar los primeros 6 dígitos numéricos
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digitsOnly.length > 0) {
      const newCode = [...code];
      digitsOnly.split('').forEach((digit, idx) => {
        if (idx < 6) newCode[idx] = digit;
      });
      setCode(newCode);
      
      // Focus en el último input lleno o en el siguiente vacío
      const lastFilledIndex = Math.min(digitsOnly.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  // Valida y envía el código
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Por favor ingresa el código completo de 6 dígitos');
      return;
    }

    // TODO: Aquí iría la validación real del código con el backend
    console.log('Verificando código:', fullCode);
    
    // Por ahora, simulamos que cualquier código de 6 dígitos es válido
    // En producción, esto debería validarse con el backend
    if (fullCode === '123456') {
      // Código de prueba válido
      onNext({ verification_code: fullCode });
    } else {
      // Para desarrollo, aceptamos cualquier código de 6 dígitos
      onNext({ verification_code: fullCode });
      
      // En producción, mostrar error:
      // setError('Código incorrecto. Por favor intenta nuevamente.');
    }
  };

  // Función para reenviar código (placeholder por ahora)
  const handleResendCode = () => {
    console.log('Reenviar código a:', phoneNumber);
    // TODO: Implementar lógica de reenvío
    alert('Código reenviado (simulado)');
  };

  return (
    <div className="register-step-two">
      <div className="register-step-two__container">
        {/* Header con flecha de retroceso */}
        <div className="register-step-two__header">
          <button 
            className="register-step-two__back-button"
            onClick={onBack}
            type="button"
            aria-label="Volver"
          >
            <IoArrowBack size={24} />
          </button>
          <h2 className="register-step-two__title">Confirma tu número de teléfono</h2>
          <div className="register-step-two__spacer"></div>
        </div>

        {/* Instrucciones */}
        <p className="register-step-two__instructions">
          Ingresa el código que te enviamos al WhatsApp
          {phoneNumber && (
            <span className="register-step-two__phone-number">
              {' '}(+51 {phoneNumber})
            </span>
          )}
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-step-two__form">
          {/* Inputs para el código */}
          <div className="register-step-two__code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) =>{(inputRefs.current[index] = el)}}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`register-step-two__code-input ${
                  digit ? 'register-step-two__code-input--filled' : ''
                } ${error ? 'register-step-two__code-input--error' : ''}`}
                aria-label={`Dígito ${index + 1}`}
              />
            ))}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="register-step-two__error">
              {error}
            </div>
          )}

          {/* Enlace para reenviar código */}
          <div className="register-step-two__resend">
            <span>¿No recibiste el código? </span>
            <button
              type="button"
              className="register-step-two__resend-link"
              onClick={handleResendCode}
            >
              Reenviar
            </button>
          </div>

          {/* Botón de continuar */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={code.join('').length !== 6}
          >
            Continuar
          </Button>

          {/* Nota de desarrollo (eliminar en producción) */}
          <div className="register-step-two__dev-note">
            <small>💡 Para desarrollo: Usa cualquier código de 6 dígitos</small>
          </div>
        </form>
      </div>
    </div>
  );
};
