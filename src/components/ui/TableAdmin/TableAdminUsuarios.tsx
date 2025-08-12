import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TableAdminUsuarios.module.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const TableAdminUsuarios = () => {

  // 👇 Define la estructura del usuario
interface Usuario {
  id_usuario: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  num_celular: string;
  tipo_usuario: string;
  activo: boolean;
  fecha_registro: string;
}

// 👇 Luego, especifica que el estado es un array de usuarios
const [usuarios, setUsuarios] = useState<Usuario[]>([]);



  useEffect(() => {
     const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>(`${backendUrl}/usuarios`); // <--- Aquí se especifica el tipo
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <>
      <h3>Tabla de usuarios</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>🧑‍💼 Nombre completo</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Tipo de usuario</th>
              <th>Estado</th>
              <th>Fecha registro</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>
                  🧑‍💼 {`${usuario.nombres} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}
                </td>
                <td>{usuario.email}</td>
                <td>{usuario.num_celular}</td>
                <td>{usuario.tipo_usuario}</td>
                <td
                  className={usuario.activo ? styles.activo : styles.suspendido}
                >
                  {usuario.activo ? 'Activo' : 'Suspendido'}
                </td>
                <td>{new Date(usuario.fecha_registro).toLocaleDateString()}</td>
                <td>
                  <span className={styles.eliminar}>Eliminar usuario</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
