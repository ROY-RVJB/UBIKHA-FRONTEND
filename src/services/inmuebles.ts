import axios from 'axios';
import type { Inmueble, InmuebleFiltros } from './../types/inmuebles';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://26.196.154.46:800';

export async function getInmuebleById(id: string | number, token?: string): Promise<Inmueble> {
  try {
    const response = await axios.get(`${API_URL}/inmuebles/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener los detalles del inmueble');
  }
}

export async function searchInmuebles(filtros: InmuebleFiltros, token?: string): Promise<Inmueble[]> {
  try {
    const response = await axios.get(`${API_URL}/inmuebles/`, {
      params: filtros,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al buscar inmuebles');
  }
}
