import styles from './TopbarAdminEstadisticas.module.css';
import { Search, User } from 'lucide-react';

export const TopbarAdminEstadisticas = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar Estadisticas" />
    <Search size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><User size={20} /></div>
</header>

  );
};

