import { NavbarArrendatario, Footer } from '../components/layout';
import DetallePropiedad from '../components/features/arrendatario/DetallePropiedad/DetallePropiedad'; // Importación por defecto


const DetallePropiedadPage = () => {
  return (
    <div className="detalle-propiedad-page">
      <NavbarArrendatario
              becomeHostText="Conviértete en Arrendador"
              userProfileText=""
            />
      <DetallePropiedad />

      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
};

export default DetallePropiedadPage; // Exportación por defecto