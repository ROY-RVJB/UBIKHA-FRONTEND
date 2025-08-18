// src/types/property.ts

// Interfaz para los datos del arrendador
export interface Landlord {
  nombre: string;
  fechaUnion: string;
  reseñas: number;
  verificado: boolean;
  superArrendador: boolean;
  indiceRespuestas: number;
  tiempoRespuesta: string;
}

// Esta interfaz define la forma que debe tener un objeto de propiedad en el frontend
export interface Property {
  id: string;
  id_inmueble: number; // Añadido para el reporte
  titulo: string;
  tipo: 'casa' | 'departamento' | 'cuarto';
  precio: number;
  imageUrl: string;
  ubicacion: string;
  caracteristicas: { nombre: string; icono: string; }[];
  calificacion?: number;
  descripcion?: string; // Añadido
  imagenes?: string[]; // Añadido (aunque usaremos imageUrl como principal por ahora)
  arrendador?: Landlord; // Añadido
}
