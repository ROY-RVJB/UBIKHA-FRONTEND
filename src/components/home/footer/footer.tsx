import './Footer.css';

interface FooterProps {
  companyName: string;
  year: number;
}

export const Footer = ({ companyName, year }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Asistencia</h4>
          <a href="#">Centro de ayuda</a>
          <a href="#">AirCover</a>
          <a href="#">Antidiscriminación</a>
          <a href="#">Apoyo para discapacitados</a>
          <a href="#">Opciones de cancelación</a>
          <a href="#">Problemas en el vecindario</a>
        </div>

        <div className="footer-column">
          <h4>Modo anfitrión</h4>
          <a href="#">Pon tu espacio en {companyName}</a>
          <a href="#">Ofrece tu experiencia</a>
          <a href="#">AirCover para anfitriones</a>
          <a href="#">Recursos para anfitriones</a>
          <a href="#">Foro comunitario</a>
          <a href="#">Buscar un coanfitrión</a>
        </div>

        <div className="footer-column">
          <h4>{companyName}</h4>
          <a href="#">Novedades</a>
          <a href="#">Sala de prensa</a>
          <a href="#">Carreras</a>
          <a href="#">Inversionistas</a>
          <a href="#">Espacios en {companyName}.org</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} {companyName}, Inc.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Mapa del sitio</a>
        </div>
      </div>
    </footer>
  );
};