import { LoginForm } from '../components/ui';

function LoginAdministradorPage() {
  const handleSubmit = (credentials: { email: string; password: string }) => {
    console.log('Login administrador:', credentials);
    // Aquí manejarías la lógica de login para arrendador
  };

  return (
    <div className="login-page">
      <LoginForm
        title="Administrador"
        subtitle="te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginAdministradorPage;
