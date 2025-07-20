
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginArrendadorPage, LoginArrendatarioPage, LoginAdministradorPage, HomePageArrendador} from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';


export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-arrendador" element={<LoginArrendadorPage />} />
        <Route path="/login-arrendatario" element={<LoginArrendatarioPage />} />
        <Route path="/login-administrador" element={<LoginAdministradorPage />} />
        <Route path="/home-arrendador" element={<HomePageArrendador/>}/>
        <Route path="/home-arrendatario" element={<HomePageArrendatario/>}/>
        {/* Nueva ruta para el dashboard del administrador */}
        <Route path="/admin-dashboard" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>🎯 Dashboard Administrador</h1><p>Login exitoso! Aquí iría el panel de administrador.</p></div>} />
      </Routes>
    </Router>
  );
};

