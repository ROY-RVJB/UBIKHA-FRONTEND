import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/layout";
import { NavbarArrendatario, SearchBar } from '../components/layout';
import { PropertyCard } from '../components/features/arrendatario/PropertyCard/PropertyCard';
import { useInmuebles } from '../hooks/useInmuebles';

// Importa las funciones de la API y el servicio de autenticación
import { getReservasUsuario } from '../services/reservas';
import { getMisReviews } from '../services/reviews';
import { getMisFavoritos, addFavorito } from '../services/favoritos'; // Solo se importa addFavorito
import { authService } from '../services/authService';

function HomePageArrendatario() {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const { inmuebles, loading, error } = useInmuebles();

  // Estados para el navbar y la carga
  const [hasReservas, setHasReservas] = useState(false);
  const [hasReviews, setHasReviews] = useState(false);
  const [hasFavorites, setHasFavorites] = useState(false);
  const [isNavbarLoading, setIsNavbarLoading] = useState(true);

  const handleViewDetails = (id: string) => {
    navigate(`/propiedad/${id}`);
  };

  // Lógica SIMPLIFICADA para agregar un favorito (solo añade, no elimina)
  const handleSaveProperty = async (id: string) => {
    const token = authService.getToken();
    if (!token) {
      alert('Debes iniciar sesión para guardar favoritos.');
      return;
    }

    const isSaved = savedProperties.includes(id);

    // Si ya está guardado, no hacemos nada. Si no, lo agregamos.
    if (!isSaved) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        await addFavorito(id, tokenPayload.sub, token);
        setSavedProperties(prev => [...prev, id]);
      } catch (err) {
        console.error("Error al agregar a favoritos:", err);
        alert('Hubo un error al agregar a tus favoritos.');
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsNavbarLoading(true);
      const token = authService.getToken();

      if (token) {
        try {
          const reservasData = await getReservasUsuario(token);
          setHasReservas(reservasData.reservas.length > 0);

          const reviewsData = await getMisReviews(token);
          setHasReviews(reviewsData.length > 0);

          const favoritosData = await getMisFavoritos(token);
          setHasFavorites(favoritosData.length > 0);
          setSavedProperties(favoritosData.map(id => id.toString()));
        } catch (err) {
          console.error("Error al cargar datos del usuario:", err);
        } finally {
          setIsNavbarLoading(false);
        }
      } else {
        setIsNavbarLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading || isNavbarLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavbarArrendatario
        becomeHostText="Conviértete en Arrendador"
        userProfileText=""
        hasReservas={hasReservas}
        hasReviews={hasReviews}
        hasFavorites={hasFavorites}
      />
      
      <SearchBar 
        locationPlaceholder="Ubicación"
        durationPlaceholder="¿Cuánto tiempo?"
      />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {inmuebles.map((property) => (
          <PropertyCard 
            key={property.id}
            property={property}
            onViewDetails={handleViewDetails}
            onSave={handleSaveProperty}
            isSaved={savedProperties.includes(property.id)}
          />
        ))}
      </div>
      
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePageArrendatario;
