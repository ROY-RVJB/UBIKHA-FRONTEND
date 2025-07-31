//import AdminReportesLayout from '@/components/ui/AdminReportesLayout/AdminReportesLayout';
import { AdminReportesLayout } from '../components/ui/AdminDashboardLayout/AdminReportesLayout';
import { TableAdminReportes } from '../components/ui/TableAdmin/TableAdminReportes';
//import TableAdminReportes from '@/components/ui/TableAdmin/TableAdminReportes';

const ReporteAdministradorPage = () => {
  const reportesEnEspera = [
    {
      reporte: 'Es una estafa',
      fecha: '12 de abril 2026',
      descripcion: 'No cumplió',
      realizado: true,
    },
    {
      reporte: 'Es ofensivo',
      fecha: '30 de agosto 2025',
      descripcion: 'Es agresivo',
      realizado: true,
    },
  ];

  const reportesRealizados = [
    {
      reporte: 'Es ofensivo',
      fecha: '30 de agosto 2025',
      descripcion: 'Lorem ipsum .....',
    },
  ];

  return (
    <AdminReportesLayout>
      <TableAdminReportes titulo="Reportes en espera" datos={reportesEnEspera} />
      <TableAdminReportes titulo="Reportes realizados" datos={reportesRealizados} />
    </AdminReportesLayout>
  );
};

export default ReporteAdministradorPage;

