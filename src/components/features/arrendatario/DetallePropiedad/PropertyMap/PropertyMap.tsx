import React from 'react';
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
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  latitude,
  longitude,
  locationGroups,
  zoom = 14
}) => {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <div className="cusco-map-container">
      <div className="map-sidebar">
        {locationGroups.map((group, index) => (
          <div key={index} className="location-group">
            <h3>{group.title}</h3>
            <ul>
              {group.locations.map((location, locIndex) => (
                <li key={locIndex}>{location}</li>
              ))}
            </ul>
            {index < locationGroups.length - 1 && <hr className="divider" />}
          </div>
        ))}
      </div>
      
      <div className="map-container">
        <iframe
          title="Mapa de Cusco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default PropertyMap;