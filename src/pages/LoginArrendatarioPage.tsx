import { LoginForm } from '../components/ui';

function LoginArrendatarioPage() {
  const handleSubmit = (credentials: { email: string; password: string }) => {
    console.log('Login Arrendatario:', credentials);
    // Aquí manejarías la lógica de login para arrendatario
  };

  return (
    <div className="login-page">
      <LoginForm
        title="Arrendatario"
        subtitle="Te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginArrendatarioPage;
