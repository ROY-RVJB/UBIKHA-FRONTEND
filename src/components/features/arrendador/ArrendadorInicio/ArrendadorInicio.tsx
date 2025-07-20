import React from 'react';
import { WelcomeSection, NotificationsList } from '../';
import './ArrendadorInicio.css';

export interface ArrendadorInicioProps {
  userName?: string;
}

export const ArrendadorInicio: React.FC<ArrendadorInicioProps> = ({
  userName = "Luis"
}) => {
  return (
    <main className="arrendador-inicio">
      <div className="arrendador-inicio-container">
        <WelcomeSection 
          userName={userName}
        />
        
        <NotificationsList 
          maxVisible={4}
          showViewAll={true}
        />
      </div>
    </main>
  );
};