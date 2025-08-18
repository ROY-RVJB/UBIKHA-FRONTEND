import './NavbarArrendatario.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../ui/Avatar/Avatar';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export interface NavbarArrendatarioProps {
  becomeHostText?: string;
  userProfileText?: string;
  hasReservas?: boolean; // Add this line
  hasReviews?: boolean; // Add this line
  hasFavorites?: boolean; // Add this line
}

export const NavbarArrendatario = ({ 
  becomeHostText = "Conviértete en Arrendador",
  userProfileText = "Perfil de usuario",
}: NavbarArrendatarioProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-arrendatario">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand" onClick={() => handleNavigation('/home-arrendatario')}>
          <img 
            src={logo} 
            alt="UBIKHA Logo" 
            className="navbar-logo" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Botón de Inicio */}
          <Button 
            variant='inlining' 
            size='sm'
            onClick={() => handleNavigation('/home-arrendatario')}>
            Inicio
          </Button>

          <Button 
            variant='inlining' 
            size='sm'
            onClick={() => handleNavigation('/mis-favoritos')}>
            Mis favoritos
          </Button>

          <Button 
            variant='inlining' 
            size='sm' 
            onClick={() => handleNavigation('/mis-reservas')}>
            Mis reservas
          </Button>

          <Button 
            variant='inlining' 
            size='sm' 
            onClick={() => handleNavigation('/mis-reseñas')}>
            Mis reseñas
          </Button>
        </div>

        {/* Right section */}
        <div className='navbar-actions'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleNavigation('/login')}>
            {becomeHostText}
          </Button>
          
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleNavigation('/perfil')}>
            {userProfileText}
          </Button>
          
          <div className='avatar-wrapper'>
            <Avatar name="Roy" />
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <img src={logo} alt="UBIKHA" className="mobile-menu-logo" />
              <button 
                className="mobile-menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mobile-menu-links">
              {/* Botón de Inicio en el menú móvil */}
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/home-arrendatario')}
              >
                Inicio
              </button>

              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/mis-favoritos')}
              >
                Mis favoritos
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/mis-reservas')}
              >
                Mis reservas
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/mis-resenas')}
              >
                Mis reseñas
              </button>
              <button 
                className="mobile-menu-item mobile-menu-mode"
                onClick={() => handleNavigation('/login')}
              >
                {becomeHostText}
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/perfil')}
              >
                {userProfileText}
              </button>
            </div>

            <div className="mobile-menu-user">
              <Avatar name="Roy" />
              <span>Roy</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};