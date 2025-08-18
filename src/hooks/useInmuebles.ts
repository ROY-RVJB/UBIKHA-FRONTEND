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

// Hook personalizado que maneja toda la lógica de obtención de datos
export const useInmuebles = () => {
  const [inmuebles, setInmuebles] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/inmuebles/`);
        const apiInmuebles: InmuebleAPI[] = response.data;

        // Mapear los datos de la API al formato de la interfaz Property
        const mappedInmuebles: Property[] = apiInmuebles.map(apiInmueble => {
          let tipo: 'casa' | 'departamento' | 'cuarto' = 'departamento'; // Valor por defecto

          console.log('apiInmueble.tipo_inmueble:', apiInmueble.tipo_inmueble);
          if (apiInmueble.tipo_inmueble === 'casa' || apiInmueble.tipo_inmueble === 'departamento' || apiInmueble.tipo_inmueble === 'cuarto') {
            tipo = apiInmueble.tipo_inmueble;
          }

          return {
            id: String(apiInmueble.id_inmueble), // Asegúrate de que el ID sea un string
            id_inmueble: apiInmueble.id_inmueble,
            titulo: apiInmueble.titulo,
            tipo: tipo,
            precio: apiInmueble.precio_mensual,
            imageUrl: 'https://picsum.photos/400/250?random=' + apiInmueble.id_inmueble, // Usar un ID único para cada imagen
            ubicacion: 'Ubicación no especificada', // La API no devuelve la ubicación
            caracteristicas: [], // La API no devuelve características
            descripcion: apiInmueble.descripcion,
            calificacion: 0 // La API no devuelve la calificación
          };
        });

        setInmuebles(mappedInmuebles);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener inmuebles:', err);
        setError('No se pudieron cargar los inmuebles.');
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, []);

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
        const response = await axios.get(`/api/inmuebles/${id}`);
        const apiInmueble: InmuebleAPI = response.data;

        let tipo: 'casa' | 'departamento' | 'cuarto' = 'departamento'; // Valor por defecto

        if (apiInmueble.tipo_inmueble === 'casa' || apiInmueble.tipo_inmueble === 'departamento' || apiInmueble.tipo_inmueble === 'cuarto') {
          tipo = apiInmueble.tipo_inmueble;
        }

        const mappedInmueble: Property = {
          id: String(apiInmueble.id_inmueble),
          id_inmueble: apiInmueble.id_inmueble,
          titulo: apiInmueble.titulo,
          tipo: tipo,
          precio: apiInmueble.precio_mensual,
          imageUrl: 'https://picsum.photos/400/250?random=' + apiInmueble.id_inmueble,
          ubicacion: apiInmueble.direccion || 'Ubicación no especificada',
          caracteristicas: [
            { nombre: 'Habitaciones', icono: 'habitaciones' },
            { nombre: 'Baños', icono: 'baños' },
            { nombre: 'Wifi', icono: 'wifi' },
            { nombre: 'Cocina', icono: 'cocina' },
            { nombre: 'Estacionamiento', icono: 'estacionamiento' },
            { nombre: 'Televisión', icono: 'television' },
            { nombre: 'Aire acondicionado', icono: 'aire acondicionado' },
            { nombre: 'Servicio de lavandería', icono: 'servicio_lavanderia' },
            { nombre: 'Cámaras de seguridad', icono: 'camaras_seguridad' },
            { nombre: 'Mascotas permitidas', icono: 'mascotas_permitidas' },
          ].filter(caracteristica => {
            switch (caracteristica.nombre) {
              case 'Habitaciones': return apiInmueble.habitaciones > 0;
              case 'Baños': return apiInmueble.banos > 0;
              case 'Wifi': return apiInmueble.wifi;
              case 'Cocina': return apiInmueble.cocina;
              case 'Estacionamiento': return apiInmueble.estacionamiento;
              case 'Televisión': return apiInmueble.television;
              case 'Aire acondicionado': return apiInmueble.aire_acondicionado;
              case 'Servicio de lavandería': return apiInmueble.servicio_lavanderia;
              case 'Cámaras de seguridad': return apiInmueble.camaras_seguridad;
              case 'Mascotas permitidas': return apiInmueble.mascotas_permitidas;
              default: return false;
            }
          }),
          descripcion: apiInmueble.descripcion,
          calificacion: 0
        };

        setInmueble(mappedInmueble);
        setLoading(false);
      } catch (error: any) {
        console.error('Error al obtener inmueble por ID:', error);
        if (error.response && error.response.status === 404) {
          setError('El inmueble no se encuentra.');
        } else {
          setError('No se pudo cargar el inmueble.');
        }
        setLoading(false);
      }
    };

    fetchInmueble();
  }, [id]);

  return { inmueble, loading, error };
};
