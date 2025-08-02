//import { AdminPropiedadesLayout } from '../components/ui/AdminDashboardLayout/AdminPropiedadesLayout';
import { AdminEstadisticasLayout } from '../components/ui/AdminDashboardLayout/AdminEstadisticasLayout';

//import { TableAdminPropiedades } from '../components/ui/TableAdmin/TableAdminPropiedades';
import { TableAdminEstadisticas } from '../components/ui/TableAdmin/TableAdminEstadisticas';
const EstadisticasAdministradorPage = () => {
  return (
    <AdminEstadisticasLayout>
      <h2>Tabla de Estadisticas</h2>
      <TableAdminEstadisticas />
    </AdminEstadisticasLayout>
  );
};
export default EstadisticasAdministradorPage;



