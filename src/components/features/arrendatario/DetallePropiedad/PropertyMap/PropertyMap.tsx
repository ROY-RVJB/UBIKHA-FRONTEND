import React, { useEffect, useRef } from 'react';
import './PropertyMap.css';

interface LocationGroup {
  title: string;
  locations: string[];
}

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  locationGroups: LocationGroup[];
  zoom?: number;
  apiKey: string; // Reintroducir la clave de API como prop
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  latitude,
  longitude,
  zoom = 14,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (window.google && mapRef.current && panoramaRef.current) {
        const { Map } = await google.maps.importLibrary("maps");
        const { StreetViewPanorama } = await google.maps.importLibrary("streetView");

        const location = { lat: latitude, lng: longitude };

        const map = new Map(mapRef.current, {
          center: location,
          zoom: zoom,
        });

        const panorama = new StreetViewPanorama(
          panoramaRef.current,
          {
            position: location,
            pov: {
              heading: 34,
              pitch: 10,
            },
          }
        );
        map.setStreetView(panorama);
      }
    };

    // Asignar la función de inicialización a window.initMap
    // Esto se ejecutará cuando el script de Google Maps se cargue
    (window as any).initMap = initializeMap;

    // Limpiar la asignación al desmontar el componente
    return () => {
      delete (window as any).initMap;
    };
  }, [latitude, longitude, zoom]);

  return (
    <div className="property-map-section">
      <div id="map" ref={mapRef} className="map-container"></div>
      <div id="pano" ref={panoramaRef} className="pano-container"></div>
    </div>
  );
};

export default PropertyMap;
