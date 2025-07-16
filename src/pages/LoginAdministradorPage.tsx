import { useState } from 'react';
import { LoginForm } from '../components/ui';

function LoginAdministradorPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Login exitoso:', data);
        // Guardar token
        localStorage.setItem('authToken', data.token);
        // Redireccionar
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
      
    } catch (error) {
      setError('Error de conexión con el servidor');
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
        loading={loading}    // ← Pasa el estado de loading
        error={error}        // ← Pasa el estado de error
      />
    </div>
  );
}

export default LoginAdministradorPage;