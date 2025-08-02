import styles from './SidebarAdminPropiedades.module.css';
import {
  LuUsers,
  LuFileText,
  LuChartColumnBig,
  LuHouse,
  LuBadgeDollarSign,
  LuLogOut
} from 'react-icons/lu';
import logoUbikha from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
export const SidebarAdminPropiedades = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}> <img src={logoUbikha} alt="Logo Ubikha" className={styles.logoImage} />
  <span className={styles.logoText}>UBIKHA</span></div>
      <nav>

   <ul>
        <li><LuHouse size={18} /> Home</li>
        <li><LuUsers size={18} /> Usuarios</li>
        <li><LuFileText size={18} /> Reportes</li>
        <li><LuChartColumnBig size={18} /> Estadísticas</li>
        <li><LuHouse size={18} /> Propiedades</li>
        <li><LuBadgeDollarSign size={18} /> Pagos y finanzas</li>
        <li><LuLogOut size={18} /> Cerrar sesión</li>
      </ul>

      </nav>
    </aside>
  );
};


