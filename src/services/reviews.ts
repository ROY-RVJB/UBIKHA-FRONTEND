import axios from 'axios';

// La interfaz se adapta para reflejar la estructura de tu endpoint de reseñas de inmuebles
export interface Review {
  id_resena?: number;
  id_usuario?: number;
  id_inmueble: number;
  calificacion: number;
  comentario?: string;
  fecha_resena?: string;
  estado_resena?: string;
}

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://26.196.154.46:8000';

// Función para obtener reseñas de un inmueble específico
export async function getReviewsByInmueble(inmuebleId: number | string, token?: string) {
  try {
    const response = await axios.get(`${API_URL}/resenas/${inmuebleId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener las reseñas del inmueble');
  }
}

// Función para crear una reseña en un inmueble
export async function createReview(reviewData: Review, token?: string) {
  try {
    // Aseguramos que solo se envíen los campos necesarios para la creación
    const payload = {
      id_inmueble: reviewData.id_inmueble,
      calificacion: reviewData.calificacion,
      comentario: reviewData.comentario,
    };
    const response = await axios.post(`${API_URL}/resenas/`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear review');
  }
}

// Nueva función para obtener las reseñas de un usuario, si es necesario
export async function getMisReviews(token?: string) {
  try {
    const response = await axios.get(`${API_URL}/resenas/mis-resenas`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener mis reseñas');
  }
}