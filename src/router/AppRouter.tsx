import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, HomePageArrendador, MisAnunciosPage,MisMensajesPage} from '../pages';
import HomePageArrendatario from '../pages/HomePageArrendatario';
import PropiedadesAdministradorPage from '../pages/PropiedadesAdministradorPage';

import DetallePropiedadPage from '../pages/DetallePropiedadPage';

import UsuariosAdministradorPage from '../pages/UsuariosAdministradorPage';
import ReporteAdministradorPage from '../pages/ReporteAdministradorPage';
import HomeAdministradorPage from '../pages/HomeAdministradorPage';
import EstadisticasAdministradorPage from '../pages/EstadisticasAdministradorPage';
import PagosAdministradorPage from '../pages/PagosAdministradorPage';
import CrearAnuncio from '../pages/CrearAnuncio';


import PropertySetupIntro from '../pages/crear/PropertySetupIntro'; // CSS
import PropertyLocationForm from '../pages/crear/PropertyLocationForm';
import PropertyCapacityForm from '../pages/crear/PropertyCapacityForm';
import PropertyPresentationIntro from '../pages/crear/PropertyPresentationIntro';
import PropertyAmenitiesSelector from '../pages/crear/PropertyAmenitiesSelector';
import PropertyPhotoUploader from '../pages/crear/PropertyPhotoUploader';
import PropertyTitleEditor from '../pages/crear/PropertyTitleEditor';
import PropertyDescriptionEditor from '../pages/crear/PropertyDescriptionEditor';
import PropertyPublishingIntro from '../pages/crear/PropertyPublishingIntro';
import PropertyPricingCalculator from '../pages/crear/PropertyPricingCalculator';

import MisReservasPage from '../pages/MisReservasPage';
import MisResenasPage from '../pages/MisResenasPage';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Login universal */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 📝 Registro multi-paso */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 🏠 Dashboards por rol */}
        <Route path="/home-arrendador" element={<HomePageArrendador />} />
        <Route path="/home-arrendatario" element={<HomePageArrendatario />} />

         {/* 🏠 Funcionalidades Administrador*/}
        <Route path="/admin-usuarios" element={<UsuariosAdministradorPage/>} />
        <Route path="/admin-reporte" element={<ReporteAdministradorPage/>} />
        <Route path="/admin-home" element={<HomeAdministradorPage/>} />
        <Route path="/admin-propiedades" element={<PropiedadesAdministradorPage />} />
        <Route path="/admin-estadisticas" element={<EstadisticasAdministradorPage />} />
        <Route path="/admin-pagos" element={<PagosAdministradorPage />} /> 


        {/* 🏠 Funcionalidades Arrendador */}
        <Route path="/mis-anuncios" element={<MisAnunciosPage />} />
        <Route path="/mis-mensajes" element={<MisMensajesPage />} />
        <Route path="/crear-anuncio/:tipo" element={<CrearAnuncio/>} />

        {/* PASOS PARA CREAR  */}
        <Route path="/step1" element={<PropertySetupIntro/>} />
        <Route path="/step1/location" element={<PropertyLocationForm />} />
        <Route path="/step1/capacity" element={<PropertyCapacityForm />} />
        <Route path="/step2" element={<PropertyPresentationIntro />} />
        <Route path="/step2/amenities" element={<PropertyAmenitiesSelector />} />
        <Route path="/step2/photos" element={<PropertyPhotoUploader />} />
        <Route path="/step2/title" element={<PropertyTitleEditor />} />
        <Route path="/step2/description" element={<PropertyDescriptionEditor />} />
        <Route path="/step3" element={<PropertyPublishingIntro />} />
        <Route path="/step3/price" element={<PropertyPricingCalculator />} />

        

        {/* 🏡 Detalle de propiedad (accesible para arrendatarios) */}
        <Route path="/propiedad/:id" element={<DetallePropiedadPage />} />
        <Route path="/mis-reservas" element={<MisReservasPage />} />
        <Route path="/mis-reseñas" element={<MisResenasPage />} />

        

      </Routes>
    </Router>
  );
};
