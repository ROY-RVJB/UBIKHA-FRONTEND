// src/components/icons/IconTipo.tsx
import { LuHouse, LuBuilding, LuDoorClosed } from 'react-icons/lu';
import React from 'react';
import type { Anuncio } from '../../../components/features/arrendador/MisAnuncios/AnuncioCard';
import './IconTipo.css';

export const IconTipo: React.FC<{ 
  tipo: Anuncio['tipo'];
  variant?: 'default' | 'table';
}> = ({ tipo, variant = 'default' }) => {
  const icons = {
    casa: <LuHouse />,
    departamento: <LuBuilding />,
    cuarto: <LuDoorClosed />
  };
  
  // Aplica clase base + modificador para tabla, o solo clase base
  const className = variant === 'table' ? 'icon-tipo icon-tipo--table' : 'icon-tipo';
  
  return (
    <div className={className}>
      <span className="icon-tipo__icon">{icons[tipo]}</span>
      <span className="icon-tipo__label">{tipo}</span>
    </div>
  );
};