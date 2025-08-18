import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  num_celular: string;
  role: 'arrendatario' | 'arrendador' | 'administrador';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getUserInitial: () => string;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = authService.getToken();
        if (token) {
          // Intentar obtener datos del usuario desde localStorage
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // Si hay token pero no datos del usuario, intentar decodificar el token
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              // Solo tenemos email del token, el resto será 'X' por defecto
              setUser({
                nombres: '',
                apellido_paterno: '',
                apellido_materno: '',
                email: payload.usuario || '',
                num_celular: '',
                role: authService.getCurrentUserRole() || 'arrendatario'
              });
            } catch (error) {
              console.error('Error decodificando token:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      }
    };
    
    loadUser();
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  const getUserInitial = (): string => {
    if (!user || !user.nombres || user.nombres.trim() === '') {
      return 'X';
    }
    return user.nombres.trim().charAt(0).toUpperCase();
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('userData');
    authService.logout();
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUserInitial, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider');
  }
  return context;
};