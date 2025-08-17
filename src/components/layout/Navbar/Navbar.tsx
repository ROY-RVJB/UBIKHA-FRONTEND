import './Navbar.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate} from 'react-router-dom';
import  Avatar    from '../../ui/Avatar/Avatar';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';


export interface NavbarProps {
  text_1:string;
  text_2:string;
  text_3:string;
  text_4:string;
}
export const Navbar = ({ text_1, text_2,text_3,text_4 }: NavbarProps) => {
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
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand" onClick={() => handleNavigation('/home-arrendador')}>
          <img 
            src={logo} 
            alt="ubikhaLogo" 
            className="navbarLogo" 
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Button 
            variant='inlining' 
            size='sm'
            onClick={() => handleNavigation('/home-arrendador')}>
            {text_1}
          </Button>

          <Button 
            variant='inlining' 
            size='sm' 
            onClick={() => handleNavigation('/mis-anuncios')}>
            {text_2}
          </Button>

          <Button 
            variant='inlining' 
            size='sm' 
            onClick={() => handleNavigation('/mis-mensajes')}>
            {text_3}
          </Button>
        </div>

        {/* Right section with mode switcher and avatar */}
        <div className='navbar-actions'>
          <Button
            variant='ghost'
            size='sm'
            className='mode-switcher'
            onClick={() => handleNavigation('/home-arrendatario')}>
            {text_4}
          </Button>
          <div className='avatar-wrapper'>
            <Avatar name="Luis" />
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
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/home-arrendador')}
              >
                {text_1}
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/mis-anuncios')}
              >
                {text_2}
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => handleNavigation('/mis-mensajes')}
              >
                {text_3}
              </button>
              <button 
                className="mobile-menu-item mobile-menu-mode"
                onClick={() => handleNavigation('/home-arrendatario')}
              >
                {text_4}
              </button>
            </div>

            <div className="mobile-menu-user">
              <Avatar name="Luis" />
              <span>Luis</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};