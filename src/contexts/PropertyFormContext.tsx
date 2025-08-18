import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { PropertyData } from '../services/propertyService';

interface PropertyFormContextType {
  formData: PropertyData;
  updateFormData: (data: Partial<PropertyData>) => void;
  resetForm: () => void;
}

const initialFormData: PropertyData = {
  aire_acondicionado: false,
  banos: 0,
  camaras_seguridad: false,
  camas: 0,
  cocina: false,
  descripcion: '',
  direccion: '',
  estacionamiento: false,
  habitaciones: 0,
  huespedes: 0,
  mascotas_permitidas: false,
  precio_mensual: 0,
  referencias: '',
  servicio_lavanderia: false,
  television: false,
  tipo_inmueble: 'casa',
  titulo: '',
  wifi: false
};

const PropertyFormContext = createContext<PropertyFormContextType | undefined>(undefined);

export const PropertyFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<PropertyData>(initialFormData);

  const updateFormData = (data: Partial<PropertyData>) => {
    setFormData(prev => {
      const updated = { ...prev, ...data };
      console.log('📝 Actualizando datos del formulario:', data);
      console.log('📋 Estado actual del formulario:', updated);
      return updated;
    });
  };

  const resetForm = () => {
    console.log('🔄 Reiniciando formulario');
    setFormData(initialFormData);
    // También limpiar el localStorage del tipo de inmueble
    localStorage.removeItem('propertyType');
  };

  return (
    <PropertyFormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </PropertyFormContext.Provider>
  );
};

export const usePropertyForm = () => {
  const context = useContext(PropertyFormContext);
  if (context === undefined) {
    throw new Error('usePropertyForm debe ser usado dentro de un PropertyFormProvider');
  }
  return context;
};