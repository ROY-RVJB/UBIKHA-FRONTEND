import React from 'react';
import { IconButton } from '../../../../ui';
import type { Anuncio } from '../AnuncioCard';
import './AnuncioTableRow.css';

export interface AnuncioTableRowProps {
  anuncio: Anuncio;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const AnuncioTableRow: React.FC<AnuncioTableRowProps> = ({
  anuncio,
  onEdit,
  onToggleStatus,
  onViewDetails
}) => {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'success';
      case 'pendiente_aprobacion':
        return 'warning';
      case 'accion_necesaria':
        return 'error';
      case 'pausado':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'Activo';
      case 'pendiente_aprobacion':
        return 'En progreso';
      case 'accion_necesaria':
        return 'Acción necesaria';
      case 'pausado':
        return 'Pausado';
      default:
        return estado;
    }
  };

  const getTipoText = (tipo: string) => {
    switch (tipo) {
      case 'casa':
        return 'Casa';
      case 'departamento':
        return 'Departamento';
      case 'cuarto':
        return 'Habitación';
      default:
        return tipo;
    }
  };

  return (
    <tr className="anuncio-table-row">
      {/* Anuncio (imagen + título) */}
      <td className="anuncio-table-row__anuncio">
        <div className="anuncio-table-row__content">
          <div className="anuncio-table-row__image">
            <img 
              src={anuncio.imageUrl} 
              alt={anuncio.titulo}
              className="anuncio-table-row__img"
            />
          </div>
          <div className="anuncio-table-row__info">
            <h3 className="anuncio-table-row__title">{anuncio.titulo}</h3>
            <p className="anuncio-table-row__price">S/. {anuncio.precio.toLocaleString()}/mes</p>
          </div>
        </div>
      </td>

      {/* Tipo */}
      <td className="anuncio-table-row__tipo">
        <span className="anuncio-table-row__badge anuncio-table-row__badge--tipo">
          {getTipoText(anuncio.tipo)}
        </span>
      </td>

      {/* Ubicación */}
      <td className="anuncio-table-row__ubicacion">
        <span className="anuncio-table-row__location">{anuncio.ubicacion}</span>
      </td>

      {/* Estado */}
      <td className="anuncio-table-row__estado">
        <span className={`anuncio-table-row__badge anuncio-table-row__badge--${getStatusColor(anuncio.estado)}`}>
          {getStatusText(anuncio.estado)}
        </span>
      </td>

      {/* Acciones */}
      <td className="anuncio-table-row__actions">
        <div className="anuncio-table-row__buttons">
          <IconButton
            icon="eye"
            onClick={() => onViewDetails(anuncio.id)}
            variant="ghost"
            size="sm"
            tooltip="Ver detalles"
          />
          <IconButton
            icon="edit"
            onClick={() => onEdit(anuncio.id)}
            variant="ghost"
            size="sm"
            tooltip="Editar"
          />
          <IconButton
            icon={anuncio.estado === 'activo' ? 'close' : 'plus'}
            onClick={() => onToggleStatus(anuncio.id)}
            variant="ghost"
            size="sm"
            tooltip={anuncio.estado === 'activo' ? 'Pausar anuncio' : 'Activar anuncio'}
          />
        </div>
      </td>
    </tr>
  );
};