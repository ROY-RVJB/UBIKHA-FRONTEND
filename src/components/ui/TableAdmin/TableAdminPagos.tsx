import styles from "./TableAdminPagos.module.css";

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
          {datos.map((p, idx) => (
            <tr key={idx}>
              <td>{p.ganancia}</td>
              <td>{p.comision}</td>
              <td>{p.metodo}</td>
            </tr>
          ))}

          {datos.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: 16, textAlign: "center", color: "#6b7280" }}>
                No hay datos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdminPagos;
