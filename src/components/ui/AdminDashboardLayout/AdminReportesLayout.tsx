// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

import styles from './AdminReporteLayout.module.css'

import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';

//import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';
//import { TopbarAdminUsuarios} from '../TopbarAdmin/TopbarAdminUsuarios'
import { TopbarAdminReportes } from '../TopbarAdmin/TopbarAdminReportes';
import type { ReactNode } from 'react';

interface AdminReportesLayoutProps {
  children: ReactNode;
}

export const AdminReportesLayout = ({ children }: AdminReportesLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminReportes />
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
