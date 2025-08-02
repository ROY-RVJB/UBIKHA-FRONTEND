
import styles from './TableAdminUsuarios.module.css'
const data = [
  { nombre: 'Usuario 1', rol: 'Arrendador | Arrendatario', estado: 'Activo' },
  { nombre: 'Usuario 2', rol: 'Arrendatario', estado: 'Activo' },
  { nombre: 'Usuario 3', rol: 'Arrendador', estado: 'Suspendido' },
  { nombre: 'Usuario 4', rol: 'Arrendador', estado: 'Activo' },
  { nombre: 'Usuario 5', rol: 'Arrendatario', estado: 'Suspendido' },
];

export const TableAdminUsuarios = () => {
  return (
    <table className={styles.tabla}>
      <thead>
        <tr>
          <th>🧑‍💼 Usuarios</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {data.map((usuario, index) => (
          <tr key={index}>
            <td>🧑‍💼 {usuario.nombre}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.estado}</td>
            <td><span className={styles.eliminar}>Eliminar usuario</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
