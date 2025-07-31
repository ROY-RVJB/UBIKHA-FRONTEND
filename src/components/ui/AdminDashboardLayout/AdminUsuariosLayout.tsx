// src/components/ui/AdminDashboardLayout/AdminDashboardLayout.tsx

//import styles from './AdminPropiedadesLayout.module.css';
import styles from './AdminUsuariosLayout.module.css'
import {  SidebarAdminPropiedades } from '../SidebarAdmin/SidebarAdminPropiedades';

//import { TopbarAdminPropiedades } from '../TopbarAdmin/TopbarAdminPropiedades';
import { TopbarAdminUsuarios} from '../TopbarAdmin/TopbarAdminUsuarios'

import type { ReactNode } from 'react';

interface AdminUsuariosLayoutProps {
  children: ReactNode;
}

export const AdminUsuariosLayout = ({ children }: AdminUsuariosLayoutProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <SidebarAdminPropiedades />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <TopbarAdminUsuarios />
        </header>

        <section className={styles.contentArea}>
          {children} {/* Aquí se mostrará el contenido */}
        </section>
      </main>
    </div>
  );
};
