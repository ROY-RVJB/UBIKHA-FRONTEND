import React from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Settings, 
  Menu, 
  X,
  MoreVertical,
  Download,
  Upload,
  Heart,
  Share,
  Rows,
  Filter
} from 'lucide-react';
import './IconButton.css';

// Mapeo centralizado de íconos
const iconMap = {
  plus: Plus,
  search: Search,
  edit: Edit,
  delete: Trash2,
  eye: Eye,
  settings: Settings,
  menu: Menu,
  close: X,
  more: MoreVertical,
  download: Download,
  upload: Upload,
  heart: Heart,
  share: Share,
  filter: Filter,
  rows: Rows
} as const;

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