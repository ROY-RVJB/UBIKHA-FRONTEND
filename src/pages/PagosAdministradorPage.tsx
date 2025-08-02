import { TableAdminPagos } from '../components/ui';
import { AdminPagosLayout } from '../components/ui/AdminDashboardLayout/AdminPagosLayout';

const datosPagos = [
  { ganancia: 's/ 30000.00', comision: 's/ 300.00', metodo: 'Visa' },
  { ganancia: 's/ 20000.00', comision: 's/ 200.00', metodo: 'Yape' },
];

const PagosAdministradorPage = () => {
  return (
    <AdminPagosLayout>
      <TableAdminPagos titulo="PAGOS Y FINANZAS" datos={datosPagos} />
    </AdminPagosLayout>
  );
};

export default PagosAdministradorPage;
