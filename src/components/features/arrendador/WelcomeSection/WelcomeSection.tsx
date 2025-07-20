import React from 'react';
import './WelcomeSection.css';

export interface WelcomeSectionProps {
  userName?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = "Arrendador"
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 18) return "¡Buenas tardes";
    return "¡Buenas noches";
  };

  return (
    <section className="welcome-section">
      <h1 className="welcome-title">
        {getGreeting()}, {userName}!
      </h1>
      <p className="welcome-subtitle">
        Bienvenido a tu panel de arrendador en UBIKHA
      </p>
    </section>
  );
};