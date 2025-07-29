
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, HomePageArrendador, MisAnunciosPage} from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';
import PropiedadesAdministradorPage from '../pages/PropiedadesAdministradorPage';





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
        <Route path="/admin-propiedades" element={<PropiedadesAdministradorPage/>} />

        {/* 🏠 Funcionalidades Arrendador */}
        <Route path="/mis-anuncios" element={<MisAnunciosPage/>} />
        
        {/* ❌ ELIMINADAS - Rutas de login específicas: */}
        {/* /login-arrendador, /login-arrendatario, /login-administrador */}      </Routes>
    </Router>
  );
};

