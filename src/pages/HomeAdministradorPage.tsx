import { FaShoppingCart, FaUserPlus, FaUserCog, FaChartBar } from 'react-icons/fa';

import { AdminHomeLayout } from '../components/ui/AdminDashboardLayout/AdminHomeLayout';
//import StatCard from '@/components/ui/StatCard/StatCard';
import { TableAdminHome } from '../components/ui/TableAdmin/TableAdminHome';

export const HomeAdministradorPage = () => {
  return (
    <AdminHomeLayout>
      <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        <TableAdminHome 
          titulo="Cantidad de inmuebles publicados" 
          descripcion="30 inmuebles" 
          icono={<FaShoppingCart />} 
        />
        <TableAdminHome 
          titulo="Nuevos registros (usuarios y arrendadores)" 
          descripcion="10 Usuarios y 30 Arrendadores" 
          icono={<FaUserPlus />} 
        />
        <TableAdminHome 
          titulo="Gestión de administradores" 
          descripcion="10 administradores actualmente" 
          icono={<FaUserCog />} 
        />
        <TableAdminHome
          titulo="Estadísticas de actividad" 
          descripcion="Tablas estadísticas" 
          icono={<FaChartBar />} 
        />
      </div>
    </AdminHomeLayout>
  );
};

export default HomeAdministradorPage;
