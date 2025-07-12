// src/components/Header/Header.tsx
import './Header.css';  // Importamos SU propio CSS

interface HeaderProps {
  title: string;
  text_1:string;
  text_2:string;
}

export const Header = ({ title,text_1,text_2 }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
     <div className="header-links">
      <a className='texto_1' href="https://www.google.com/?hl=es">{text_1}</a>
      <a className='texto_2' href="https://www.google.com/?hl=es">{text_2}</a>
     </div>
    </header>
  );
};