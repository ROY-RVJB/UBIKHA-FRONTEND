import { Import } from 'lucide-react';
import { AdminPropiedadesLayout } from '../components/ui/AdminDashboardLayout/AdminPropiedadesLayout';
//import { AdminPropiedadesLayout } from '../components/ui/AdminPropiedadesLayout/AdminPropiedadesLayout';
//mport { UserTable } from '../components/ui/UserTable/UserTable';

import { TableAdminPropiedades } from '../components/ui/TableAdmin/TableAdminPropiedades';

const PropiedadesAdministradorPage = () => {
  return (
    <AdminPropiedadesLayout>
      <h2>Tabla de propiedades</h2>
      <TableAdminPropiedades />
    </AdminPropiedadesLayout>
  );
};

export default PropiedadesAdministradorPage;
