
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, HomePageArrendador, MisAnunciosPage} from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';
import UsuariosAdministradorPage from '../pages/UsuariosAdministradorPage';




export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* 🔐 Login universal - Reemplaza 3 páginas anteriores */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 🏠 Dashboards por rol */}
        <Route path="/home-arrendador" element={<HomePageArrendador/>}/>
        <Route path="/home-arrendatario" element={<HomePageArrendatario/>}/>
        <Route path="/admin-dashboard" element={<UsuariosAdministradorPage/>} />
        
        {/* 🏠 Funcionalidades Arrendador */}
        <Route path="/mis-anuncios" element={<MisAnunciosPage/>} />
        
        {/* ❌ ELIMINADAS - Rutas de login específicas: */}
        {/* /login-arrendador, /login-arrendatario, /login-administrador */}      </Routes>
    </Router>
  );
};

