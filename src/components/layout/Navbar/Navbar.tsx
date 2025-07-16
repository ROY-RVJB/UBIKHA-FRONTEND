import './Navbar.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate} from 'react-router-dom';


export interface NavbarProps {
  text_1:string;
  text_2:string;
  text_3:string;
}
export const Navbar = ({ text_1, text_2,text_3 }: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img 
          src={logo} 
          alt="ubikhaLogo" 
          className="navbarLogo" 
        />
      </div>
      
      <div className="navbar-links">
        <Button 
        variant='inlining' 
        size='sm'
        onClick={() => navigate('/')}>
          {text_1}
        </Button>

        <Button 
        variant='inlining' 
        size='sm' 
        onClick={() => navigate('/')}>
          {text_2}
        </Button>

        <Button 
        variant='inlining' 
        size='sm' 
        onClick={() => navigate('/')}>
          {text_3}
        </Button>
      </div>
      
      
    </nav>
  );
};