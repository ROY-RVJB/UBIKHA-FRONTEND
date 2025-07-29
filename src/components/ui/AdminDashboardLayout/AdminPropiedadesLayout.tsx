// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

import styles from './AdminPropiedadesLayout.module.css';
import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';
import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';

import type { ReactNode } from 'react';

interface AdminPropiedadesLayoutProps {
  children: ReactNode;
}

export const AdminPropiedadesLayout = ({ children }: AdminPropiedadesLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminPropiedades />
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
