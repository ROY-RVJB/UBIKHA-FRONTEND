import React from 'react';
import {
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuEye,
  LuSettings,
  LuList,
  LuX,
  LuCheck,
  LuDownload,
  LuUpload,
  LuHeart,
  LuShare,
  LuFilter,
  LuRows2
} from 'react-icons/lu';

export const iconMap = {
  plus: LuPlus,
  search: LuSearch,
  edit: LuPencil,
  delete: LuTrash2,
  eye: LuEye,
  settings: LuSettings,
  menu: LuList,
  close: LuX,
  check: LuCheck,
  download: LuDownload,
  upload: LuUpload,
  heart: LuHeart,
  share: LuShare,
  filter: LuFilter,
  rows: LuRows2
} as const;


import './IconButton.css';
// Mapeo centralizado de íconos


export type IconType = keyof typeof iconMap;

export interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'circle';
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  className?: string;
  'aria-label'?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = 'primary',
  size = 'md',
  shape = 'square',
  disabled = false,
  loading = false,
  tooltip,
  className = '',
  'aria-label': ariaLabel
}) => {
  const IconComponent = iconMap[icon];
  
  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap`);
    return null;
  }

  const getIconSize = () => {
    const sizes = {
      'sm': 16,
      'md': 20,
      'lg': 24
    };
    return sizes[size];
  };

  const buttonClasses = `
    icon-button
    icon-button--${variant}
    icon-button--${size}
    icon-button--${shape}
    ${loading ? 'icon-button--loading' : ''}
    ${disabled ? 'icon-button--disabled' : ''}
    ${className}
  `.trim();

  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || tooltip || `${icon} button`}
      title={tooltip}
    >
      {loading ? (
        <div className="icon-button__spinner" />
      ) : (
        <span className="icon-button__icon" data-icon={icon}>
          <IconComponent 
            size={getIconSize()} 
            strokeWidth={2.5}
          />
        </span>
      )}
    </button>
  );
};