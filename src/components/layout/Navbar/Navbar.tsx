import './Navbar.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate} from 'react-router-dom';
import  Avatar    from '../../ui/Avatar/Avatar';


export interface NavbarProps {
  text_1:string;
  text_2:string;
  text_3:string;
  text_4:string;
}
export const Navbar = ({ text_1, text_2,text_3,text_4 }: NavbarProps) => {
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
        onClick={() => navigate('/home-arrendador')}>
        {text_1}
        </Button>

        <Button 
        variant='inlining' 
        size='sm' 
        onClick={() => navigate('/mis-anuncios')}>
        {text_2}
        </Button>

        <Button 
        variant='inlining' 
        size='sm' 
        onClick={() => navigate('/mis-mensajes')}>
        {text_3}
        </Button>
      </div>
      <div className='especial'>
        <Button
        variant='ghost'
        size='sm'
        onClick={()=>navigate('/login')}>
          {text_4}
        </Button>
      <div>
        <Avatar name="Roy" />
      </div>
      </div>
      
      
    </nav>
  );
};