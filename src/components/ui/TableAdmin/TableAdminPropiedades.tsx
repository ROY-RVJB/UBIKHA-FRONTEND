import styles from './TableAdminPropiedades.module.css';

export const TableAdminPropiedades = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>🏡 Propiedades</th>
            <th>👨‍💼 Dueño</th>
            <th>📋 Estado</th>
            <th>⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🏡 Propiedad 1</td>
            <td>👨‍💼 Mark Anthony</td>
            <td>Pendiente</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>🏡 Propiedad 2</td>
            <td>👨‍💼 Anthony Mark</td>
            <td className={styles.activo}>Activo</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>🏡 Propiedad 3</td>
            <td>👨‍💼 Anthony Villasante</td>
            <td className={styles.suspendido}>Suspendido</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>🏡 Propiedad 4</td>
            <td>👨‍💼 Mark Avalos</td>
            <td className={styles.activo}>Activo</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
          <tr>
            <td>🏡 Propiedad 5</td>
            <td>👨‍💼 Jordy Mark</td>
            <td className={styles.suspendido}>Suspendido</td>
            <td><button className={styles.action}>ACCIONES ⌄</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
