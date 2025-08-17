
export interface LoginCredentials {
  num_celular: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  num_celular: string;
  fecha_nacimiento: string;
  password: string;
}

export interface RegistrationResponse {
  message: string;
  usuario_id?: number;
}

// Interfaz para la respuesta real del backend
interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  usuario: string;
  rol: 'arrendatario' | 'arrendador' | 'admin';
}

// Interfaz normalizada para el frontend
export interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: 'arrendatario' | 'arrendador' | 'administrador';
  };
}

export type UserType = 'administrador' | 'arrendador' | 'arrendatario';

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    console.log('🔧 Backend URL configurada:', this.baseURL);
  }

  /**
   * Mapea roles del backend al frontend
   */
  private mapRole(backendRole: 'arrendatario' | 'arrendador' | 'admin'): 'arrendatario' | 'arrendador' | 'administrador' {
    const roleMap = {
      'arrendatario': 'arrendatario' as const,
      'arrendador': 'arrendador' as const, 
      'admin': 'administrador' as const
    };  
    return roleMap[backendRole];
  }

  /**
   * Obtiene la ruta de redirección basada en el rol del usuario
   */
  getRedirectPath(role: 'arrendatario' | 'arrendador' | 'administrador'): string {
    const redirectMap = {
      'administrador': '/admin-home',
      'arrendador': '/home-arrendador', 
      'arrendatario': '/home-arrendatario'
    };
    return redirectMap[role];
  }

  /**
   * Método universal de login
   */
  private async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login-json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        num_celular: credentials.num_celular,
        password: credentials.password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Credenciales incorrectas');
    }

    const backendData: BackendLoginResponse = await response.json();
    
    // Normalizar respuesta del backend al formato que espera el frontend
    const normalizedResponse: LoginResponse = {
      token: backendData.access_token,
      user: {
        email: backendData.usuario,
        role: this.mapRole(backendData.rol)
      }
    };

    // Auto-guardar token
    localStorage.setItem('authToken', normalizedResponse.token);
    
    return normalizedResponse;
  }

  /**
   * Métodos específicos para cada tipo de usuario
   */
  async loginAdmin(credentials: LoginCredentials): Promise<LoginResponse> {
    const result = await this.login(credentials);
    
    // Verificar que realmente sea admin
    if (result.user.role !== 'administrador') {
      throw new Error('Acceso denegado: Se requieren permisos de administrador');
    }
    
    return result;
  }

  async loginArrendador(credentials: LoginCredentials): Promise<LoginResponse> {
    const result = await this.login(credentials);
    
    // Verificar que realmente sea arrendador
    if (result.user.role !== 'arrendador') {
      throw new Error('Acceso denegado: Se requieren permisos de arrendador');
    }
    
    return result;
  }

  async loginArrendatario(credentials: LoginCredentials): Promise<LoginResponse> {
    const result = await this.login(credentials);
    
    // Verificar que realmente sea arrendatario
    if (result.user.role !== 'arrendatario') {
      throw new Error('Acceso denegado: Se requieren permisos de arrendatario');
    }
    
    return result;
  }

  /**
   * Login universal (para futuro login único)
   */
  async loginUniversal(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.login(credentials);
  }

  /**
   * Métodos utilitarios para manejo de tokens
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtener rol del usuario actual
   */
  getCurrentUserRole(): 'administrador' | 'arrendador' | 'arrendatario' | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      // Decodificar JWT para obtener rol (base64 decode del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return this.mapRole(payload.rol);
    } catch {
      return null;
    }
  }

  /**
   * Registro de nuevo arrendatario
   */
  async register(data: RegistrationData): Promise<RegistrationResponse> {
    const response = await fetch(`${this.baseURL}/auth/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error en el registro');
    }

    const result: RegistrationResponse = await response.json();
    return result;
  }

  /**
   * Enviar código de verificación por WhatsApp
   */
  async sendWhatsAppVerification(phoneNumber: string): Promise<{message: string}> {
    const payload = { phone_number: phoneNumber };
    
    console.log('🚀 Enviando a WhatsApp:', payload);
    console.log('🔗 URL:', `${this.baseURL}/whatsapp-auth/enviar-codigo-registro`);
    
    const response = await fetch(`${this.baseURL}/whatsapp-auth/enviar-codigo-registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📱 Status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Error enviando código WhatsApp';
      
      try {
        const errorData = await response.json();
        console.error('❌ Error del servidor:', errorData);
        
        // Manejar diferentes tipos de error
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Errores de validación de FastAPI
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

    const result = await response.json();
    console.log('✅ Respuesta exitosa:', result);
    return result;
  }

  /**
   * Verificar código de WhatsApp
   */
  async verifyWhatsAppCode(phoneNumber: string, code: string): Promise<{message: string}> {
    const payload = { phone_number: phoneNumber, code: code };
    
    console.log('🔍 Verificando código WhatsApp:', payload);
    console.log('🔗 URL:', `${this.baseURL}/whatsapp-auth/verificar-codigo-registro`);
    
    const response = await fetch(`${this.baseURL}/whatsapp-auth/verificar-codigo-registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📱 Status verificación:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Error verificando código WhatsApp';
      
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

    const result = await response.json();
    console.log('✅ Código verificado exitosamente:', result);
    return result;
  }

  /**
   * Completar registro después de verificación WhatsApp
   */
  async completeWhatsAppRegistration(data: RegistrationData & { confirmar_password?: string }): Promise<RegistrationResponse> {
    // Separar num_celular del payload ya que va como parámetro
    const { num_celular, ...bodyData } = data;
    
    const payload = {
      email: bodyData.email,
      nombres: bodyData.nombres,
      apellido_paterno: bodyData.apellido_paterno,
      apellido_materno: bodyData.apellido_materno,
      fecha_nacimiento: bodyData.fecha_nacimiento,
      password: bodyData.password,
      confirmar_password: bodyData.confirmar_password || bodyData.password
    };
    
    console.log('🎯 Completando registro WhatsApp:');
    console.log('📱 Número celular (parámetro):', num_celular);
    console.log('📋 Datos del body:', payload);
    console.log('🔗 URL:', `${this.baseURL}/whatsapp-auth/completar-registro?num_celular=${num_celular}`);
    console.log('📋 Payload JSON:', JSON.stringify(payload, null, 2));
    console.log('🔍 Validaciones:');
    console.log('  - Email:', payload.email, '(válido:', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email), ')');
    console.log('  - Teléfono:', num_celular, '(longitud:', num_celular.length, ')');
    console.log('  - Fecha:', payload.fecha_nacimiento, '(formato válido:', /^\d{4}-\d{2}-\d{2}$/.test(payload.fecha_nacimiento), ')');
    console.log('  - Password:', '[OCULTO]', '(longitud:', payload.password.length, ')');
    
    // Configurar timeout de 30 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const response = await fetch(`${this.baseURL}/whatsapp-auth/completar-registro?num_celular=${num_celular}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('📱 Status registro:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Error completando registro';
        
        try {
          const responseText = await response.text();
          console.error('❌ Respuesta completa del servidor:', responseText);
          console.error('❌ Status:', response.status);
          console.error('❌ Headers:', Object.fromEntries(response.headers.entries()));
          
          try {
            const errorData = JSON.parse(responseText);
            console.error('❌ Error del servidor (JSON):', errorData);
            
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
          } catch (jsonError) {
            console.error('❌ Respuesta no es JSON válido:', jsonError);
            errorMessage = `Error ${response.status}: ${responseText.substring(0, 200)}`;
          }
        } catch (parseError) {
          console.error('❌ Error leyendo respuesta:', parseError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(`${errorMessage} (Status: ${response.status})`);
      }

      const result: RegistrationResponse = await response.json();
      console.log('✅ Registro WhatsApp completado:', result);
      return result;
      
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error('❌ Timeout - Solicitud cancelada después de 30 segundos');
        throw new Error('La solicitud tardó demasiado tiempo. Por favor intenta nuevamente.');
      }
      
      // Si ya es nuestro error custom, no lo envolvemos
      if (error.message.includes('Status:')) {
        throw error;
      }
      
      console.error('❌ Error de red o conexión:', error);
      throw new Error(`Error de conexión: ${error.message}`);
    }
  }

  /**
   * Logout completo
   */
  logout(): void {
    this.removeToken();
    // En el futuro: llamar endpoint de logout del backend
  }
}

// Instancia singleton del servicio
export const authService = new AuthService();