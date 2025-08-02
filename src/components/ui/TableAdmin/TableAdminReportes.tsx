import styles from './TableAdminReportes.module.css';

interface Report {
  reporte: string;
  fecha: string;
  descripcion: string;
  realizado?: boolean;
}

interface TableAdminReportesProps {
  titulo: string;
  datos: Report[];
}

export const TableAdminReportes = ({ titulo, datos }: TableAdminReportesProps) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.seccion}>{titulo}</h4>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Reportes</th>
            <th>Fecha</th>
            <th>Descripción</th>
            {datos.some((r) => r.realizado !== undefined) && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {datos.map((item, idx) => (
            <tr key={idx}>
              <td>{item.reporte}</td>
              <td>{item.fecha}</td>
              <td>{item.descripcion}</td>
              {item.realizado !== undefined && (
                <td>
                  {item.realizado && (
                    <button className={styles.boton}>Realizado</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableAdminReportes;