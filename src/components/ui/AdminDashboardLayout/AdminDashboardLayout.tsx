// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

import styles from './AdminDashboardLayout.module.css';
import { SidebarAdmin } from '../SidebarAdmin/SidebarAdmin';
import { TopbarAdmin } from '../TopbarAdmin/TopbarAdmin';

import type { ReactNode } from 'react';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdmin />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdmin />
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
