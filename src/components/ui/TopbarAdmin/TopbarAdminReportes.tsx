//import styles from './TopbarAdminUsuarios.module.css';
import styles from './TopbarAdminReportes.module.css'
import { Search, User } from 'lucide-react';
// revisar luego el tema de las importaciones

export const TopbarAdminReportes = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar Reporte" />
    <Search size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><User size={20} /></div>
</header>

  );
};
