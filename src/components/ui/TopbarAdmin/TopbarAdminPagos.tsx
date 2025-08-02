import styles from './TopbarAdminPagos.module.css';
import { LuSearch, LuUser } from 'react-icons/lu';

export const TopbarAdminPagos = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar pagos" />
    <LuSearch size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><LuUser size={20} /></div>
</header>

  );
};

