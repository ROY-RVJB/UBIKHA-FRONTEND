import './NavbarArrendatario.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import  Avatar    from '../../ui/Avatar/Avatar';
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
          onClick={() => navigate('/login-arrendatario')}>
          {becomeHostText}
        </Button>

         <Button
        variant='ghost'
        size='sm'
        onClick={()=>navigate('/')}>
          {userProfileText}
        </Button>
      <div>
        <Avatar name="Roy" />
      </div>
      </div>
    </nav>
  );
};