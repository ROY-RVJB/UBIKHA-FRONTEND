import styles from './TopbarAdminPropiedades.module.css';
import { BsSearch, BsPerson } from 'react-icons/bs';

export const TopbarAdminPropiedades = () => {
  return (
   <header className={styles.topbar}>
  <div className={styles.searchWrapper}>
    <input type="text" placeholder="Buscar propiedades" />    
    <BsSearch size={18} className={styles.searchIcon} />
  </div>
  <div className={styles.avatar}><BsPerson size={20} /></div>
</header>

  );
};

