import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/ui';
import { authService } from '../services/authService';

function LoginArrendadorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    
    try {
      // Usar el servicio de autenticación para arrendador
      const result = await authService.loginArrendador(credentials);
      
      console.log('Login arrendador exitoso:', result);
      
      // Redirigir al dashboard de arrendador
      navigate('/home-arrendador');
      
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
        title="Arrendador"
        subtitle="te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default LoginArrendadorPage;