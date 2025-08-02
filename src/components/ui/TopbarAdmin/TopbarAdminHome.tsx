import styles from './TopbarAdminHome.module.css';
import {LuSearch,LuUser} from 'react-icons/lu';

export const TopbarAdminHome = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar propiedades" />
    <LuSearch size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><LuUser size={20} /></div>
</header>

  );
};

