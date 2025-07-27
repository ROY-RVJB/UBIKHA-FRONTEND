import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '../IconButton/IconButton';
import './RetractableSearch.css';

export interface RetractableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const RetractableSearch: React.FC<RetractableSearchProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  size = 'md',
  variant = 'ghost'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-expandir si hay valor inicial
  useEffect(() => {
    if (value && !isExpanded) {
      setIsExpanded(true);
    }
  }, [value, isExpanded]);

  // Manejar click fuera para colapsar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !value &&
        isExpanded
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, value]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        onChange('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded, onChange]);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // Focus automático al input cuando se expande
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else if (!value) {
      setIsExpanded(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputBlur = () => {
    // Solo colapsar si no hay valor
    if (!value) {
      setTimeout(() => setIsExpanded(false), 150);
    }
  };

  const containerClasses = `
    retractable-search
    retractable-search--${size}
    ${isExpanded ? 'retractable-search--expanded' : 'retractable-search--collapsed'}
    ${className}
  `.trim();

  return (
    <div ref={containerRef} className={containerClasses}>
      <IconButton
        icon="search"
        onClick={handleToggle}
        variant={isExpanded || value ? 'primary' : variant}
        size={size}
        tooltip={isExpanded ? 'Buscar' : 'Expandir búsqueda'}
        className="retractable-search__button"
      />
      
      <div className="retractable-search__input-container">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="retractable-search__input"
        />
      </div>
    </div>
  );
};