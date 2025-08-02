// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

import styles from './AdminHomeLayout.module.css';
import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';
//import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';

import type { ReactNode } from 'react';
import { TopbarAdminHome } from '../TopbarAdmin/TopbarAdminHome';

interface AdminHomeLayoutProps {
  children: ReactNode;
}

export const AdminHomeLayout = ({ children }: AdminHomeLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminHome/>
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
