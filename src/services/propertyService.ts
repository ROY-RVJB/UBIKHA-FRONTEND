import { authService } from './authService';

export interface PropertyData {
  aire_acondicionado: boolean;
  banos: number;
  camaras_seguridad: boolean;
  camas: number;
  cocina: boolean;
  descripcion: string;
  direccion: string;
  estacionamiento: boolean;
  habitaciones: number;
  huespedes: number;
  mascotas_permitidas: boolean;
  precio_mensual: number;
  referencias: string;
  servicio_lavanderia: boolean;
  television: boolean;
  tipo_inmueble: 'casa' | 'departamento' | 'cuarto';
  titulo: string;
  wifi: boolean;
}

export interface Property extends PropertyData {
  id_inmueble: number;
  id_propietario: number;
  precio_final?: number;
  estado?: string;
  fecha_creacion?: string;
}

class PropertyService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    console.log('🏠 Property Service inicializado con URL:', this.baseURL);
  }

  /**
   * Crear un nuevo inmueble
   */
  async createProperty(data: PropertyData): Promise<Property> {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No hay token de autenticación. Por favor inicia sesión.');
    }

    console.log('📤 Enviando datos del inmueble:', data);
    console.log('🔑 Token:', token.substring(0, 20) + '...');

    try {
      const response = await fetch(`${this.baseURL}/inmuebles/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('📥 Respuesta del servidor:', response.status);

      if (!response.ok) {
        let errorMessage = 'Error al crear el inmueble';
        
        try {
          const errorData = await response.json();
          console.error('❌ Error del servidor:', errorData);
          
          if (errorData.detail) {
            if (Array.isArray(errorData.detail)) {
              errorMessage = errorData.detail.map((err: any) => 
                `${err.loc?.[1] || 'Campo'}: ${err.msg}`
              ).join(', ');
            } else {
              errorMessage = errorData.detail;
            }
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error('❌ Error parseando respuesta:', parseError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const result: Property = await response.json();
      console.log('✅ Inmueble creado exitosamente:', result);
      return result;
      
    } catch (error: any) {
      console.error('❌ Error en createProperty:', error);
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Error de conexión. Verifica que el servidor esté activo.');
      }
      
      throw error;
    }
  }

  /**
   * Obtener todos los inmuebles del usuario
   */
  async getProperties(): Promise<Property[]> {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No hay token de autenticación. Por favor inicia sesión.');
    }

    console.log('📋 Obteniendo lista de inmuebles...');

    try {
      const response = await fetch(`${this.baseURL}/inmuebles/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('📥 Respuesta del servidor:', response.status);

      if (!response.ok) {
        let errorMessage = 'Error al obtener los inmuebles';
        
        try {
          const errorData = await response.json();
          console.error('❌ Error del servidor:', errorData);
          
          if (errorData.detail) {
            errorMessage = typeof errorData.detail === 'string' 
              ? errorData.detail 
              : 'Error al obtener los inmuebles';
          }
        } catch (parseError) {
          console.error('❌ Error parseando respuesta:', parseError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const properties: Property[] = await response.json();
      
      // Log detallado para diagnóstico
      console.log('📦 Respuesta completa del backend:', JSON.stringify(properties, null, 2));
      console.log(`📊 Tipo de respuesta: ${Array.isArray(properties) ? 'Array' : typeof properties}`);
      console.log(`✅ Se obtuvieron ${properties.length} inmuebles`);
      
      // Si hay al menos un inmueble, mostrar su estructura
      if (properties.length > 0) {
        console.log('🏠 Estructura del primer inmueble:');
        console.log('  - ID:', properties[0].id_inmueble, `(tipo: ${typeof properties[0].id_inmueble})`);
        console.log('  - Título:', properties[0].titulo);
        console.log('  - Tipo:', properties[0].tipo_inmueble);
        console.log('  - Estado:', properties[0].estado);
        console.log('  - Precio:', properties[0].precio_mensual);
        console.log('  - Dirección:', properties[0].direccion);
        console.log('  - Campos disponibles:', Object.keys(properties[0]));
      }
      
      return properties;
      
    } catch (error: any) {
      console.error('❌ Error en getProperties:', error);
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Error de conexión. Verifica que el servidor esté activo.');
      }
      
      throw error;
    }
  }

  /**
   * Obtener un inmueble específico por ID
   */
  async getPropertyById(id: number): Promise<Property> {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No hay token de autenticación. Por favor inicia sesión.');
    }

    console.log(`📋 Obteniendo inmueble con ID: ${id}`);

    try {
      const response = await fetch(`${this.baseURL}/inmuebles/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inmueble no encontrado');
        }
        throw new Error(`Error al obtener el inmueble: ${response.statusText}`);
      }

      const property: Property = await response.json();
      console.log('✅ Inmueble obtenido:', property);
      return property;
      
    } catch (error: any) {
      console.error('❌ Error en getPropertyById:', error);
      throw error;
    }
  }

  /**
   * Actualizar un inmueble existente
   */
  async updateProperty(id: number, data: Partial<PropertyData>): Promise<Property> {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No hay token de autenticación. Por favor inicia sesión.');
    }

    console.log(`📝 Actualizando inmueble ID: ${id}`, data);

    try {
      const response = await fetch(`${this.baseURL}/inmuebles/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inmueble no encontrado');
        }
        throw new Error(`Error al actualizar el inmueble: ${response.statusText}`);
      }

      const property: Property = await response.json();
      console.log('✅ Inmueble actualizado:', property);
      return property;
      
    } catch (error: any) {
      console.error('❌ Error en updateProperty:', error);
      throw error;
    }
  }

  /**
   * Eliminar un inmueble
   */
  async deleteProperty(id: number): Promise<void> {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No hay token de autenticación. Por favor inicia sesión.');
    }

    console.log(`🗑️ Eliminando inmueble ID: ${id}`);

    try {
      const response = await fetch(`${this.baseURL}/inmuebles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inmueble no encontrado');
        }
        throw new Error(`Error al eliminar el inmueble: ${response.statusText}`);
      }

      console.log('✅ Inmueble eliminado exitosamente');
      
    } catch (error: any) {
      console.error('❌ Error en deleteProperty:', error);
      throw error;
    }
  }
}

// Instancia singleton del servicio
export const propertyService = new PropertyService();