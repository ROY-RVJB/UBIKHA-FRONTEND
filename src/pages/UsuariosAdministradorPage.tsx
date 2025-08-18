//import { AdminPropiedadesLayout } from '../components/ui/AdminDashboardLayout/AdminPropiedadesLayout';
import { AdminUsuariosLayout } from '../components/ui/AdminDashboardLayout/AdminUsuariosLayout';

//import { TableAdminPropiedades } from '../components/ui/TableAdmin/TableAdminPropiedades';
import { TableAdminUsuarios } from '../components/ui/TableAdmin/TableAdminUsuarios';


export const UsuariosAdministradorPage = () => {
  return (
    <AdminUsuariosLayout>
      
      <TableAdminUsuarios />
    </AdminUsuariosLayout>
  );
};

export default UsuariosAdministradorPage;
