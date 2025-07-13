// src/components/Body/Body.tsx
import './Body.css';
import portada from '../../../assets/puertoMaldonado.jpg';
interface BodyProps {
  headline: string;
  description: string;
}

export const Body = ({ headline, description,}: BodyProps) => {
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
