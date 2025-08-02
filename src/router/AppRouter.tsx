import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, HomePageArrendador, MisAnunciosPage,MisMensajesPage} from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';
import PropiedadesAdministradorPage from '../pages/PropiedadesAdministradorPage';

import DetallePropiedadPage from '../pages/DetallePropiedadPage';
import UsuariosAdministradorPage from '../pages/UsuariosAdministradorPage';
import ReporteAdministradorPage from '../pages/ReporteAdministradorPage';
import HomeAdministradorPage from '../pages/HomeAdministradorPage';
import EstadisticasAdministradorPage from '../pages/EstadisticasAdministradorPage';
import PagosAdministradorPage from '../pages/PagosAdministradorPage';


export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Login universal */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏠 Dashboards por rol */}


        <Route path="/home-arrendador" element={<HomePageArrendador/>}/>
        <Route path="/home-arrendatario" element={<HomePageArrendatario/>}/>
        <Route path="/admin-propiedades" element={<PropiedadesAdministradorPage/>} />
        <Route path="/admin-usuarios" element={<UsuariosAdministradorPage/>} />
        <Route path="/admin-reporte" element={<ReporteAdministradorPage/>} />
        <Route path="/admin-home" element={<HomeAdministradorPage/>} />
        <Route path="/home-arrendador" element={<HomePageArrendador />} />
        <Route path="/home-arrendatario" element={<HomePageArrendatario />} />
        


        <Route path="/home-arrendador" element={<HomePageArrendador />} />
        <Route path="/home-arrendatario" element={<HomePageArrendatario />} />
        <Route path="/admin-propiedades" element={<PropiedadesAdministradorPage />} />
        <Route path="/admin-estadisticas" element={<EstadisticasAdministradorPage />} />
        <Route path="/admin-pagos" element={<PagosAdministradorPage />} /> 


        {/* 🏠 Funcionalidades Arrendador */}
        <Route path="/mis-anuncios" element={<MisAnunciosPage />} />
        <Route path="/mis-mensajes" element={<MisMensajesPage />} />

        {/* 🏡 Detalle de propiedad (accesible para arrendatarios) */}
        <Route path="/propiedad/:id" element={<DetallePropiedadPage />} />
      </Routes>
    </Router>
  );
};
