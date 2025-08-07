import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './LoginForm.css';

export interface LoginFormProps {
  onSubmit?: (credentials: { num_celular: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  showForgotPassword?: boolean;
  showRegisterLink?: boolean;
  onForgotPassword?: () => void;
  onRegisterClick?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  title = 'Iniciar Sesión',
  subtitle = 'Ingresa a tu cuenta de UBIKHA',
  showForgotPassword = true,
  showRegisterLink = true,
  onForgotPassword,
  onRegisterClick,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // CAMBIAR A: Validación de celular
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

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isPhoneValid = validatePhone(phoneNumber);
    const isPasswordValid = validatePassword(password);
    
    if (isPhoneValid && isPasswordValid && onSubmit) {
      // Limpiar el número de teléfono antes de enviarlo (eliminar espacios y caracteres no numéricos)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      onSubmit({ num_celular: cleanPhone, password });
    }
  };

  return (
    <div className="ubikha-login-form">
      <div className="ubikha-login-form__header">
        <h2 className="ubikha-login-form__title">{title}</h2>
        <p className="ubikha-login-form__subtitle">{subtitle}</p>
      </div>

      {error && (
        <div className="ubikha-login-form__error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="ubikha-login-form__form">
        <Input
        type="tel"
        label="Número de celular"
        placeholder="999 999 999"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={!!phoneError}
        errorMessage={phoneError}
        required
        name="phone"
        maxLength={9}
        />

        <Input
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          errorMessage={passwordError}
          required
          name="password"
        />

        {showForgotPassword && (
          <div className="ubikha-login-form__forgot">
            <button
              type="button"
              className="ubikha-login-form__forgot-link"
              onClick={onForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          Iniciar Sesión
        </Button>
      </form>

      {showRegisterLink && (
        <div className="ubikha-login-form__register">
          <span>¿No tienes cuenta? </span>
          <button
            type="button"
            className="ubikha-login-form__register-link"
            onClick={onRegisterClick}
          >
            Regístrate aquí
          </button>
        </div>
      )}
    </div>
  );
};
