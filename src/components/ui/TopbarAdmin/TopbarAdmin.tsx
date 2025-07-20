import styles from './TopbarAdmin.module.css';
import { Search, User } from 'lucide-react';

export const TopbarAdmin = () => {
  return (
    <header className={styles.topbar}>
      <input type="text" placeholder="Buscar reporte" />
      <button><Search size={18} /></button>
      <div className={styles.avatar}><User size={20} /></div>
    </header>
  );
};

