import { LoginForm } from '../components/ui';

function LoginArrendadorPage() {
  const handleSubmit = (credentials: { email: string; password: string }) => {
    console.log('Login Arrendador:', credentials);
    // Aquí manejarías la lógica de login para arrendador
  };

  return (
    <div className="login-page">
      <LoginForm
        title="Arrendador"
        subtitle="te damos la bienvenida a Ubikha"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginArrendadorPage;
