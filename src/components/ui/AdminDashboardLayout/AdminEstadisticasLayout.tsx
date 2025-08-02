// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

import styles from './AdminHomeLayout.module.css';
import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';
//import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';

import type { ReactNode } from 'react';
//import { TopbarAdminHome } from '../TopbarAdmin/TopbarAdminHome';
import { TopbarAdminEstadisticas } from '../TopbarAdmin/TopbarAdminEstadisticas';

interface AdminEstadisticasLayoutProps {
  children: ReactNode;
}

export const AdminEstadisticasLayout = ({ children }: AdminEstadisticasLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminEstadisticas/>
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
