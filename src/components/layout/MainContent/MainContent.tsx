import './MainContent.css';
import portada from '../../../assets/puertoMaldonado.jpg';

export interface MainContentProps {
  headline: string;
  description: string;
}

export const MainContent = ({ headline, description }: MainContentProps) => {
  return (
    <main className="main-body">
      <section className="intro-section">
        <div className='portada-text'>
            <h2>{headline}</h2>
            <p>{description}</p>
        </div>
        <div className="portada-imagen">
         <img 
          src={portada} 
          alt="missing" 
          className="portadaBody" 
        />
        </div>
      </section>
    </main>
  );
};
