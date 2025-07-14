import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './LoginForm.css';

export interface LoginFormProps {
  onSubmit?: (credentials: { email: string; password: string }) => void;
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('El email es requerido');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Ingresa un email válido');
      return false;
    }
    setEmailError('');
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
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid && onSubmit) {
      onSubmit({ email, password });
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
          type="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          errorMessage={emailError}
          required
          name="email"
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
