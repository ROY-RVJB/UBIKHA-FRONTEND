import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, HomePageArrendador, MisAnunciosPage } from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';
<<<<<<< HEAD
import PropiedadesAdministradorPage from '../pages/PropiedadesAdministradorPage';




=======
import UsuariosAdministradorPage from '../pages/UsuariosAdministradorPage';
import DetallePropiedadPage from '../pages/DetallePropiedadPage';
>>>>>>> fdbe837ea8cad363ea9da273891c18da943384e3

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Login universal */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏠 Dashboards por rol */}
<<<<<<< HEAD
        <Route path="/home-arrendador" element={<HomePageArrendador/>}/>
        <Route path="/home-arrendatario" element={<HomePageArrendatario/>}/>
        <Route path="/admin-propiedades" element={<PropiedadesAdministradorPage/>} />
=======
        <Route path="/home-arrendador" element={<HomePageArrendador />} />
        <Route path="/home-arrendatario" element={<HomePageArrendatario />} />
        <Route path="/admin-dashboard" element={<UsuariosAdministradorPage />} />
>>>>>>> fdbe837ea8cad363ea9da273891c18da943384e3

        {/* 🏠 Funcionalidades Arrendador */}
        <Route path="/mis-anuncios" element={<MisAnunciosPage />} />

        {/* 🏡 Detalle de propiedad (accesible para arrendatarios) */}
        <Route path="/propiedad/:id" element={<DetallePropiedadPage />} />
      </Routes>
    </Router>
  );
};
