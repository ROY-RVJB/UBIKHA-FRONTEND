import styles from './TableAdminHome.module.css';

interface TableAdminHomeProps {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

export const TableAdminHome = ({ titulo, descripcion, icono }: TableAdminHomeProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>{titulo}</p>
        <div className={styles.icon}>{icono}</div>
      </div>
      <p className={styles.description}>{descripcion}</p>
    </div>
  );
};

export default TableAdminHome;
