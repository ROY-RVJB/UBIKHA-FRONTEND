//import styles from './TopbarAdminUsuarios.module.css';
import styles from './TopbarAdminReportes.module.css'
import { LuSearch, LuUser } from "react-icons/lu";
// revisar luego el tema de las importaciones

export const TopbarAdminReportes = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar Reporte" />
    <LuSearch size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><LuUser size={20} /></div>
</header>

  );
};
