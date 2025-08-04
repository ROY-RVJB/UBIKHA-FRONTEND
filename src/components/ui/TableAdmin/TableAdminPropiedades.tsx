import { IconTipo } from '../IconTipo/IconTipo';
import styles from './TableAdminPropiedades.module.css';

export const TableAdminPropiedades = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de inmueble</th>
            <th>👨‍💼 Dueño</th>
            <th>📋 Estado</th>
            <th>⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1</td>
            <td><IconTipo tipo='casa' variant='table'/></td>
            <td>👨‍💼 Mark Anthony</td>
            <td>En revision </td>
            <td><button className={styles.action}>aprobar publicacion/recharar publicacion</button></td>
          </tr>
          <tr>
            <td>#2</td>
              <td><IconTipo tipo="departamento" variant='table'/></td>
            <td>👨‍💼 Anthony Mark</td>
            <td className={styles.activo}>Activo</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>#3</td>
              <td><IconTipo tipo='casa' variant='table'/></td>
            <td>👨‍💼 Anthony Villasante</td>
            <td className={styles.suspendido}>Pausado</td>
            <td><button className={styles.action}>eliminar </button></td>
          </tr>
          <tr>
            <td>#4</td>
             <td><IconTipo tipo='cuarto' variant='table'/></td>
            <td>👨‍💼 Mark Avalos</td>
            <td className={styles.activo}>Activo</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>#5</td>
              <td><IconTipo tipo='casa' variant='table'/></td>
            <td>👨‍💼 Jordy Mark</td>
            <td className={styles.suspendido}>Pausado</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
