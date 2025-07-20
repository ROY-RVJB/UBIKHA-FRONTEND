// src/services/authService.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para la respuesta real del backend
interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  usuario: string;
  rol: 'client' | 'owner' | 'admin';
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
  }

  /**
   * Mapea roles del backend al frontend
   */
  private mapRole(backendRole: 'client' | 'owner' | 'admin'): 'arrendatario' | 'arrendador' | 'administrador' {
    const roleMap = {
      'client': 'arrendatario' as const,
      'owner': 'arrendador' as const, 
      'admin': 'administrador' as const
    };
    return roleMap[backendRole];
  }

  /**
   * Obtiene la ruta de redirección basada en el rol del usuario
   */
  getRedirectPath(role: 'arrendatario' | 'arrendador' | 'administrador'): string {
    const redirectMap = {
      'administrador': '/admin-dashboard',
      'arrendador': '/home-arrendador', 
      'arrendatario': '/home-arrendatario'
    };
    return redirectMap[role];
  }

  /**
   * Método universal de login
   */
  private async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
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
   * Logout completo
   */
  logout(): void {
    this.removeToken();
    // En el futuro: llamar endpoint de logout del backend
  }
}

// Instancia singleton del servicio
export const authService = new AuthService();