import styles from './SidebarAdmin.module.css';
import { Home, Users, FileText, BarChart2, HomeIcon, DollarSign, LogOut } from 'lucide-react';

export const SidebarAdmin = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>UBIKHA</div>
      <nav>
        <ul>
          <li><Home size={18} /> Home</li>
          <li><Users size={18} /> Usuarios</li>
          <li><FileText size={18} /> Reportes</li>
          <li><BarChart2 size={18} /> Estadísticas</li>
          <li><HomeIcon size={18} /> Propiedades</li>
          <li><DollarSign size={18} /> Pagos y finanzas</li>
          <li><LogOut size={18} /> Cerrar sesión</li>
        </ul>
      </nav>
    </aside>
  );
};


