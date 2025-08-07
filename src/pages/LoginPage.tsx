import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/ui';
import { authService } from '../services/authService';

/**
 * 🎯 LOGIN UNIVERSAL - Página única para todos los roles
 * 
 * Esta página reemplaza a:
 * - LoginAdministradorPage.tsx  ❌
 * - LoginArrendadorPage.tsx     ❌  
 * - LoginArrendatarioPage.tsx   ❌
 * 
 * Funcionalidades:
 * ✅ Login universal para todos los roles
 * ✅ Redirección automática basada en rol del backend
 * ✅ Reutiliza toda la infraestructura existente
 * ✅ UX unificada y profesional
 */
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: { num_celular: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    
    try {
      // 🎯 Usar método universal - detecta automáticamente el rol
      const result = await authService.loginUniversal(credentials);
      
      console.log('Login exitoso:', result);
      
      // ✅ Redirección automática basada en el rol REAL del backend
      const redirectPath = authService.getRedirectPath(result.user.role);
      navigate(redirectPath);
      
    } catch (error) {
      // Manejo de errores unificado
      setError(error instanceof Error ? error.message : 'Error de conexión con el servidor');
      console.error('Error en login universal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <LoginForm
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta UBIKHA"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        onRegisterClick={handleRegisterClick}
      />
    </div>
  );
}

export default LoginPage;