// src/services/authService.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

export type UserType = 'administrador' | 'arrendador' | 'arrendatario';

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  }

  /**
   * Método universal de login
   */
  private async login(credentials: LoginCredentials, userType?: UserType): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        userType // Opcional: para que el backend diferencie
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Credenciales incorrectas');
    }

    // Auto-guardar token (igual que antes)
    localStorage.setItem('authToken', data.token);
    
    return data;
  }

  /**
   * Métodos específicos para cada tipo de usuario
   */
  async loginAdmin(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.login(credentials, 'administrador');
  }

  async loginArrendador(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.login(credentials, 'arrendador');
  }

  async loginArrendatario(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.login(credentials, 'arrendatario');
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
   * Logout completo
   */
  logout(): void {
    this.removeToken();
    // En el futuro: llamar endpoint de logout del backend
  }
}

// Instancia singleton del servicio
export const authService = new AuthService();