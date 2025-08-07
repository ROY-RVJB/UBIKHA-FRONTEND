import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './RegisterStepThree.css';

export interface RegisterStepThreeProps {
  onSubmit: (data: {
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    email: string;
    password: string;
  }) => void;
  onBack: () => void;
  formData: any; // Datos acumulados de pasos anteriores
}

export const RegisterStepThree: React.FC<RegisterStepThreeProps> = ({
  onSubmit,
  onBack,
  formData
}) => {
  // Estado del formulario
  const [data, setData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  // Estado de errores
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Función para actualizar un campo
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombres
    if (!data.nombres.trim()) {
      newErrors.nombres = 'El nombre es requerido';
    } else if (data.nombres.trim().length < 2) {
      newErrors.nombres = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellidos
    if (!data.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    } else if (data.apellidos.trim().length < 2) {
      newErrors.apellidos = 'Los apellidos deben tener al menos 2 caracteres';
    }

    // Validar fecha de nacimiento
    if (!data.fecha_nacimiento) {
      newErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(data.fecha_nacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        newErrors.fecha_nacimiento = 'La fecha no puede ser futura';
      } else if (age < 18) {
        newErrors.fecha_nacimiento = 'Debes ser mayor de 18 años';
      } else if (age > 120) {
        newErrors.fecha_nacimiento = 'Fecha de nacimiento inválida';
      }
    }

    // Validar email
    if (!data.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'Ingresa un email válido';
      }
    }

    // Validar contraseña
    if (!data.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (data.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (data.password.length > 20) {
      newErrors.password = 'La contraseña no puede tener más de 20 caracteres';
    }

    // Validar confirmación de contraseña
    if (!data.confirm_password) {
      newErrors.confirm_password = 'Por favor confirma tu contraseña';
    } else if (data.password !== data.confirm_password) {
      newErrors.confirm_password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para enviar (sin confirm_password)
      const submitData = {
        nombres: data.nombres.trim(),
        apellidos: data.apellidos.trim(),
        fecha_nacimiento: data.fecha_nacimiento,
        email: data.email.trim().toLowerCase(),
        password: data.password
      };

      console.log('Datos completos del registro:', {
        ...formData,
        ...submitData
      });

      // Llamar al callback onSubmit
      await onSubmit(submitData);
      
    } catch (error) {
      console.error('Error en registro:', error);
      setErrors({
        general: 'Ocurrió un error al registrar. Por favor intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Formatear fecha para el input (YYYY-MM-DD)
  const getMaxDate = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return eighteenYearsAgo.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    return hundredYearsAgo.toISOString().split('T')[0];
  };

  return (
    <div className="register-step-three">
      <div className="register-step-three__container">
        {/* Header con flecha de retroceso */}
        <div className="register-step-three__header">
          <button 
            className="register-step-three__back-button"
            onClick={onBack}
            type="button"
            aria-label="Volver"
          >
            <IoArrowBack size={24} />
          </button>
          <h2 className="register-step-three__title">Registrarse</h2>
          <div className="register-step-three__spacer"></div>
        </div>

        {/* Mensaje de error general */}
        {errors.general && (
          <div className="register-step-three__error-general">
            {errors.general}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-step-three__form">
          {/* Nombre completo */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Nombre completo
            </label>
            <Input
              type="text"
              placeholder="Nombre que aparece en el DNI"
              value={data.nombres}
              onChange={handleChange('nombres')}
              error={!!errors.nombres}
              errorMessage={errors.nombres}
              required
              name="nombres"
            />
          </div>

          {/* Apellidos */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Apellidos
            </label>
            <Input
              type="text"
              placeholder="Apellidos que aparecen en el DNI"
              value={data.apellidos}
              onChange={handleChange('apellidos')}
              error={!!errors.apellidos}
              errorMessage={errors.apellidos}
              required
              name="apellidos"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Fecha de nacimiento
            </label>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              value={data.fecha_nacimiento}
              onChange={handleChange('fecha_nacimiento')}
              error={!!errors.fecha_nacimiento}
              errorMessage={errors.fecha_nacimiento}
              required
              name="fecha_nacimiento"
              max={getMaxDate()}
              min={getMinDate()}
            />
          </div>

          {/* Correo electrónico */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Correo electrónico
            </label>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={data.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              errorMessage={errors.email}
              required
              name="email"
            />
          </div>

          {/* Contraseña */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="Contraseña"
              value={data.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              errorMessage={errors.password}
              required
              name="password"
              maxLength={20}
            />
          </div>

          {/* Confirmar contraseña */}
          <div className="register-step-three__field">
            <label className="register-step-three__label">
              Confirmar Contraseña
            </label>
            <Input
              type="password"
              placeholder="Contraseña"
              value={data.confirm_password}
              onChange={handleChange('confirm_password')}
              error={!!errors.confirm_password}
              errorMessage={errors.confirm_password}
              required
              name="confirm_password"
              maxLength={20}
            />
          </div>

          {/* Nota sobre edad mínima */}
          <div className="register-step-three__note">
            <small>Debes tener al menos 18 años para registrarte</small>
          </div>

          {/* Botón de submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Aceptar y continuar
          </Button>
        </form>
      </div>
    </div>
  );
};
