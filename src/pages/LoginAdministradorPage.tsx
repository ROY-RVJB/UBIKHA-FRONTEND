import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/ui';
import { authService } from '../services/authService';

function LoginAdministradorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    
    try {
      // Usar el servicio de autenticación
      const result = await authService.loginAdmin(credentials);
      
      console.log('Login exitoso:', result);
      
      // Completar la redirección que estaba pendiente
      navigate('/admin-dashboard');
      
    } catch (error) {
      // El servicio ya maneja los diferentes tipos de error
      setError(error instanceof Error ? error.message : 'Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        title="Administrador"
        subtitle="te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default LoginAdministradorPage;