import axios from 'axios';

// Interfaz para la respuesta del endpoint de listar favoritos
// Asumimos que la respuesta es un array de IDs de inmuebles
export interface MisFavoritosResponse {
    id_inmueble: number;
}

// Interfaz para los datos necesarios para añadir o eliminar un favorito
// Ahora incluye id_usuario, según tu API
export interface FavoritoPayload {
    id_usuario: number;
    id_inmueble: number;
}

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://26.196.154.46:8000';

/**
 * Añade un inmueble a la lista de favoritos del usuario.
 * @param inmuebleId El ID del inmueble a añadir.
 * @param idUsuario El ID del usuario.
 * @param token Token de autenticación del usuario.
 * @returns Una promesa que resuelve con un mensaje de éxito.
 */
export async function addFavorito(inmuebleId: number | string, idUsuario: number | string, token: string) {
    try {
        const payload: FavoritoPayload = {
            id_usuario: Number(idUsuario),
            id_inmueble: Number(inmuebleId)
        };
        const response = await axios.post(`${API_URL}/favoritos/`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al agregar a favoritos');
    }
}

/**
 * Elimina un inmueble de la lista de favoritos del usuario.
 * @param inmuebleId El ID del inmueble a eliminar.
 * @param token Token de autenticación del usuario.
 * @returns Una promesa que resuelve con un mensaje de éxito.
 */
export async function removeFavorito(inmuebleId: number | string, idUsuario: number | string, token: string) {
    try {
        const response = await axios.delete(`${API_URL}/favoritos/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                id_usuario: idUsuario,
                id_inmueble: inmuebleId
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al eliminar de favoritos');
    }
}


/**
 * Obtiene la lista de inmuebles favoritos de un usuario.
 * @param token Token de autenticación del usuario.
 * @returns Una promesa que resuelve con un array de IDs de inmuebles favoritos.
 */
export async function getMisFavoritos(token: string): Promise<number[]> {
    try {
        const response = await axios.get(`${API_URL}/favoritos/mis-favoritos`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener mis favoritos');
    }
}
