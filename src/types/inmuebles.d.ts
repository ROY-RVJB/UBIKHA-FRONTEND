export interface Inmueble {
  imagenes: any;
  id_inmueble: number;
  id_propietario: number;
  titulo: string;
  descripcion: string;
  precio_mensual: number;
  precio_final: number;
  tipo_inmueble: string;
  estado: string;
  direccion: string;
  referencias: string;
  huespedes: number;
  habitaciones: number;
  banos: number;
  camas: number;
  wifi: boolean;
  cocina: boolean;
  estacionamiento: boolean;
  television: boolean;
  aire_acondicionado: boolean;
  servicio_lavanderia: boolean;
  camaras_seguridad: boolean;
  mascotas_permitidas: boolean;
}

export interface InmuebleFiltros {
  tipo_inmueble?: string;
}