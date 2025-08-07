import React from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  className?: string;
  maxLength?: number;
  min?: string;
  max?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  name,
  className = '',
  maxLength,
  min,
  max,
  ...props
}) => {
  const inputClasses = `
    ubikha-input
    ${error ? 'ubikha-input--error' : ''}
    ${disabled ? 'ubikha-input--disabled' : ''}
    ${className}
  `.trim();

  return (
    <div className="ubikha-input-container">
      {label && (
        <label className="ubikha-input-label" htmlFor={name}>
          {label}
          {required && <span className="ubikha-input-required">*</span>}
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
        className={inputClasses}
        {...props}
      />
      
      {error && errorMessage && (
        <span className="ubikha-input-error-message">{errorMessage}</span>
      )}
    </div>
  );
};
