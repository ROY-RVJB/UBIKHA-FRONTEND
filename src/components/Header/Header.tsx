// src/components/Header/Header.tsx
import './Header.css';  // Importamos SU propio CSS

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  );
};