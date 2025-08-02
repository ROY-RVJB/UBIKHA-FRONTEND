import styles from './TopbarAdminPagos.module.css';
import { Search, User } from 'lucide-react';

export const TopbarAdminPagos = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar pagos" />
    <Search size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><User size={20} /></div>
</header>

  );
};

