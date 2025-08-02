// src/components/ui/TableAdmin/TableAdminPagos.tsx
import styles from './TableAdminPagos.module.css';

interface Pago {
  ganancia: string;
  comision: string;
  metodo: string;
}

interface TableAdminPagosProps {
  titulo: string;
  datos: Pago[];
}

export const TableAdminPagos = ({ titulo, datos }: TableAdminPagosProps) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.seccion}>{titulo}</h4>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Ganancia de los arrendadores</th>
            <th>Comisión ganada por UBIKHA (10%)</th>
            <th>MÉTODO DE PAGO</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, idx) => (
            <tr key={idx}>
              <td>{item.ganancia}</td>
              <td>{item.comision}</td>
              <td>{item.metodo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdminPagos;
