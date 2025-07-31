import styles from './TopbarAdminHome.module.css';
import { Search, User } from 'lucide-react';

export const TopbarAdminHome = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar propiedades" />
    <Search size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><User size={20} /></div>
</header>

  );
};

