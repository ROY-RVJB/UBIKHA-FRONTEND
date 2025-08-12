import { NavbarArrendatario, Footer } from '../components/layout';
import { useParams } from 'react-router-dom';
import { useInmuebleById } from '../hooks/useInmuebles';
import DetallePropiedad from '../components/features/arrendatario/DetallePropiedad/DetallePropiedad'; // Importación por defecto


const DetallePropiedadPage = () => {
  const { id } = useParams<{ id: string }>();
  const { inmueble, loading, error } = useInmuebleById(id);

  if (loading) {
    return (
      <div className="detalle-propiedad-page">
        <NavbarArrendatario becomeHostText="Conviértete en Arrendador" userProfileText="" />
        <p>Cargando detalles del inmueble...</p>
        <Footer companyName="UBIKHA" year={2025} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-propiedad-page">
        <NavbarArrendatario becomeHostText="Conviértete en Arrendador" userProfileText="" />
        <p>Error: {error}</p>
        <Footer companyName="UBIKHA" year={2025} />
      </div>
    );
  }

  if (!inmueble) {
    return (
      <div className="detalle-propiedad-page">
        <NavbarArrendatario becomeHostText="Conviértete en Arrendador" userProfileText="" />
        <p>Inmueble no encontrado.</p>
        <Footer companyName="UBIKHA" year={2025} />
      </div>
    );
  }

  return (
    <div className="detalle-propiedad-page">
      <NavbarArrendatario
              becomeHostText="Conviértete en Arrendador"
              userProfileText=""
            />
      <DetallePropiedad inmueble={inmueble} />

      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
};

export default DetallePropiedadPage; // Exportación por defecto
