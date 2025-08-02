// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

//import styles from './AdminPropiedadesLayout.module.css';
import styles from './AdminPagosLayout.module.css'
import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';

//import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';
//import { TopbarAdminUsuarios} from '../TopbarAdmin/TopbarAdminUsuarios'
import { TopbarAdminPagos } from '../TopbarAdmin/TopbarAdminPagos';

import type { ReactNode } from 'react';

interface AdminPagosLayoutProps {
  children: ReactNode;
}

export const AdminPagosLayout = ({ children }: AdminPagosLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminPagos />
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
