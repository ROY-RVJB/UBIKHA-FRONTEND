import axios from 'axios';

// Interfaz para una reserva completa, como la que devuelve el backend
export interface Reserva {
  id_reserva: number;
  id_usuario: number;
  id_inmueble: number;
  monto_total: number;
  estado: string;
  fecha_reserva: string;
}

// Interfaz para los datos necesarios al crear una reserva
export interface ReservaCreate {
  id_inmueble: number;
  monto_total: number;
}

// Interfaz para la respuesta del endpoint que lista las reservas
export interface ReservasResponse {
  mensaje: string;
  total_reservas: number;
  reservas: Reserva[];
}

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://26.196.154.46:8000';

// Función para crear una nueva reserva
export async function createReserva(reservaData: ReservaCreate, token?: string): Promise<Reserva> {
  try {
    const response = await axios.post(`${API_URL}/reservas/`, reservaData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear la reserva');
  }
}

// Función para obtener todas las reservas de un usuario autenticado
export async function getReservasUsuario(token?: string): Promise<ReservasResponse> {
  try {
    const response = await axios.get(`${API_URL}/reservas/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener las reservas del usuario');
  }
}