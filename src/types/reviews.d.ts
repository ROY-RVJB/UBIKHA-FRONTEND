export interface Review {
  id_resena: number;
  id_usuario: number;
  id_inmueble: number;
  calificacion: number;
  comentario: string;
  fecha_resena: string;
  estado_resena: string;
}
export interface InmuebleFiltros {
  tipo_inmueble?: string;
}