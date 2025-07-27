import './Header.css';
import logo from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { Button } from '../../ui/Button/Button';
import { useNavigate} from 'react-router-dom';


export interface HeaderProps {
  title: string;
  text_1:string;
  text_2:string;
}
export const Header = ({ title,text_1,text_2 }: HeaderProps) => {
  const navigate=useNavigate();
  return (
    <header className="header">
      <div className="header-brand">
        <img 
          src={logo} 
          alt="ubikhaLogo" 
          className="headerLogo" 
        />
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="header-links">
        <Button 
        variant='ghost' 
        size='sm'
        onClick={()=>navigate('/login')}>
          {text_1}
        </Button>

        <Button 
        variant='ghost' 
        size='sm' 
        onClick={()=>navigate('/login')}>
          {text_2}
        </Button>

      </div>
    </header>
  );
};