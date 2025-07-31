import { Import } from 'lucide-react';
//import { AdminPropiedadesLayout } from '../components/ui/AdminDashboardLayout/AdminPropiedadesLayout';
import { AdminUsuariosLayout } from '../components/ui/AdminDashboardLayout/AdminUsuariosLayout';

//import { TableAdminPropiedades } from '../components/ui/TableAdmin/TableAdminPropiedades';
import { TableAdminUsuarios } from '../components/ui/TableAdmin/TableAdminUsuarios';
const UsuariosAdministradorPage = () => {
  return (
    <AdminUsuariosLayout>
      <h2>Tabla de usuarios</h2>
      <TableAdminUsuarios />
    </AdminUsuariosLayout>
  );
};

export default UsuariosAdministradorPage;
