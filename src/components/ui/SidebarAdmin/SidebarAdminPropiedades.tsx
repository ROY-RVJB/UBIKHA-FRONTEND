//import logoUbikha from '../../../assets/LOGO-UBIKHA/ISOTIPO_1.png';
import { LuHouse } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { PiChartLineUpFill } from "react-icons/pi";
import { BsCreditCard2FrontFill } from "react-icons/bs";

import styles from "./SidebarAdminPropiedades.module.css";
import { useNavigate } from "react-router-dom";

const SidebarAdminPropiedades = () => {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <div onClick={() => navigate("/admin-home")} className={styles.menuItem}>
            <LuHouse size={18} />
            <span>Home</span>
          </div>
        </li>

        <li>
          <div onClick={() => navigate("/admin-propiedades")} className={styles.menuItem}>
            <LuHouse size={18} />
            <span>Propiedades</span>
          </div>
        </li>

        <li>
          <div onClick={() => navigate("/admin-usuarios")} className={styles.menuItem}>
            <FaUsers size={18} />
            <span>Usuarios</span>
          </div>
        </li>

        <li>
          <div onClick={() => navigate("/admin-reporte")} className={styles.menuItem}>
            <BiSolidReport size={18} />
            <span>Reportes</span>
          </div>
        </li>

        <li>
          <div onClick={() => navigate("/admin-estadisticas")} className={styles.menuItem}>
            <PiChartLineUpFill size={18} />
            <span>Estadísticas</span>
          </div>
        </li>

        <li>
          <div onClick={() => navigate("/admin-pagos")} className={styles.menuItem}>
            <BsCreditCard2FrontFill size={18} />
            <span>Pagos</span>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export { SidebarAdminPropiedades };
