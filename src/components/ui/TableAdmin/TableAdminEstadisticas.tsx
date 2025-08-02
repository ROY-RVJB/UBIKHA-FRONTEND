import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './TableAdminEstadisticas.module.css';


const data = [
  { name: 'Propiedades activas', value: 25, fill: '#ff4d4d' },      // rojo
  { name: 'Usuarios Registrados', value: 40, fill: '#3399ff' },     // azul
  { name: 'Ingresos del mes', value: 60, fill: '#00ff00' },         // verde
  { name: 'Reportes recientes', value: 30, fill: '#f9dc5c' },       // amarillo
];

export const TableAdminEstadisticas = () => {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TableAdminEstadisticas;
