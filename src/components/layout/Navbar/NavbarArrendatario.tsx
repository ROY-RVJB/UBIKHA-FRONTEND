import './NavbarArrendatario.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate } from 'react-router-dom';

export interface NavbarArrendatarioProps {
  becomeHostText?: string;
  userProfileText?: string;
}

export const NavbarArrendatario = ({ 
  becomeHostText = "Conviértete en Arrendador",
  userProfileText = "Perfil de usuario"
}: NavbarArrendatarioProps) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-arrendatario">
      <div className="navbar-left">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <img 
            src={logo} 
            alt="UBIKHA Logo" 
            className="navbar-logo" 
          />
          <span className="brand-text">UBIKHA</span>
        </div>
      </div>

      <div className="navbar-right">
        <Button 
          variant='ghost' 
          size='sm'
          className="become-host-btn"
          onClick={() => navigate('/become-host')}>
          {becomeHostText}
        </Button>

        <button 
          className="user-profile-btn"
          onClick={() => navigate('/profile')}
          aria-label={userProfileText}>
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </nav>
  );
};