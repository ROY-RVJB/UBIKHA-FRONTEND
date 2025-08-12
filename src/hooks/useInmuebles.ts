// src/hooks/useInmuebles.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Property } from '../types/property'; // Importa la interfaz Property

// URL del backend, tomada de las variables de entorno para flexibilidad
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Interfaz para el formato de datos que la API REST devuelve
interface InmuebleAPI {
  id_inmueble: number;
  id_propietario: number;
  titulo: string;
  descripcion: string;
  precio_mensual: number;
  tipo_inmueble: string;
  estado: string;
}

// Hook personalizado que maneja toda la lógica de obtención de datos
export const useInmuebles = () => {
  const [inmuebles, setInmuebles] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        // Realiza la llamada a la API del backend
        const response = await axios.get<InmuebleAPI[]>(`${backendUrl}/inmuebles`);
        
        // Mapea los datos de la API al formato de la interfaz Property
        const mappedInmuebles: Property[] = response.data.map((inmuebleAPI) => ({
          id: String(inmuebleAPI.id_inmueble), // Convierte el id a string
          titulo: inmuebleAPI.titulo,
          tipo: inmuebleAPI.tipo_inmueble as Property['tipo'],
          precio: inmuebleAPI.precio_mensual,
          imageUrl: 'https://picsum.photos/400/250?random=' + inmuebleAPI.id_inmueble, // Placeholder de imagen
          ubicacion: 'Ubicación Desconocida',
          caracteristicas: [{ nombre: 'Sin características', icono: 'info' }], // Ajustado para coincidir con la interfaz Property
          calificacion: 0,
          fechaDisponible: undefined,
        }));
        setInmuebles(mappedInmuebles);
      } catch (err) {
        console.error('Error al obtener inmuebles:', err);
        setError('No se pudieron cargar los inmuebles.');
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Devuelve los datos, el estado de carga y el error para que el componente los use
  return { inmuebles, loading, error };
};

export const useInmuebleById = (id: string | undefined) => {
  const [inmueble, setInmueble] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmueble = async () => {
      if (!id) {
        setError('ID de inmueble no proporcionado.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get<InmuebleAPI>(`${backendUrl}/inmuebles/${id}`);
        const mappedInmueble: Property = {
          id: String(response.data.id_inmueble),
          titulo: response.data.titulo,
          tipo: response.data.tipo_inmueble as Property['tipo'],
          precio: response.data.precio_mensual,
          imageUrl: 'https://picsum.photos/400/250?random=' + response.data.id_inmueble,
          ubicacion: 'Ubicación Desconocida',
          calificacion: 0,
          fechaDisponible: undefined,
          descripcion: response.data.descripcion, // Asignar la descripción de la API
          caracteristicas: (response.data as any).caracteristicas || [{ nombre: 'Sin características', icono: 'info' }], // Ajustado para coincidir con la interfaz Property
        };
        setInmueble(mappedInmueble);
      } catch (err) {
        console.error(`Error al obtener inmueble con ID ${id}:`, err);
        setError('No se pudo cargar el inmueble.');
      } finally {
        setLoading(false);
      }
    };

    fetchInmueble();
  }, [id]);

  return { inmueble, loading, error };
};
