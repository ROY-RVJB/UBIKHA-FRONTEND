import React from 'react';
import styles from './Avatar.module.css';
type AvatarProps = {
  name?: string; // Hacer opcional para manejar casos sin nombre
  backgroundColor?: string; // opcional, para personalización
};

const Avatar: React.FC<AvatarProps> = ({ name, backgroundColor }) => {
  // Si no hay nombre o está vacío, mostrar 'X'
  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : 'X';
  const displayTitle = name && name.trim() ? name : 'Usuario';

  return (
    <div
      className={styles.avatar}
      style={{ backgroundColor: backgroundColor || 'var(--color-primary-dark )'}}
      title={displayTitle}
    >
      {initial}
    </div>
  );
};

export default Avatar;