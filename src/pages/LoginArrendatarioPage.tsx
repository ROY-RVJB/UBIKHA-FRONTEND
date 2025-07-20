import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/ui';
import { authService } from '../services/authService';

function LoginArrendatarioPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    
    try {
      // Usar el servicio de autenticación para arrendatario
      const result = await authService.loginArrendatario(credentials);
      
      console.log('Login arrendatario exitoso:', result);
      
      // Redirigir al dashboard de arrendatario
      navigate('/home-arrendatario');
      
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
        title="Arrendatario"
        subtitle="Te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default LoginArrendatarioPage;