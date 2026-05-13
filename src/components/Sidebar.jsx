import { Home, Building2, Calendar, Settings, LogOut, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className={styles.sidebarMini}>
      <div className={styles.logo}>
        <Link to="/" title="Orejitas y Colitas">
          <Heart size={28} color="#db2777" fill="#db2777" />
        </Link>
      </div>

      <ul className={styles.menuList}>
        {/* AHORA LA CASA DIRIGE A ADOPCIONES */}
        <Link to="/adoption-requests" title="Adopciones" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/adoption-requests' ? styles.active : ''}`}>
            <Home size={24} />
          </li>
        </Link>

        <Link to="/shelter/:id" title="Refugios" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname.startsWith('/shelter') ? styles.active : ''}`}>
            <Building2 size={24} />
          </li>
        </Link>

        <Link to="/trial-stay" title="Pruebas de Convivencia" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/trial-stay' ? styles.active : ''}`}>
            <Calendar size={24} />
          </li>
        </Link>

        <Link to="/register" title="Configuración" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/register' ? styles.active : ''}`}>
            <Settings size={24} />
          </li>
        </Link>
      </ul>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} title="Cerrar Sesión">
          <LogOut size={24} />
        </button>
      </div>
    </nav>
  );
}