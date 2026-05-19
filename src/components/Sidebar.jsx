import { Home, Building2, Calendar, Settings, LogOut, Heart, PawPrint } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className={styles.sidebarMini}>
      <div className={styles.logo}>
        <Link to="/adoption-requests" title="Orejitas y Colitas">
          <Heart size={28} color="#db2777" fill="#db2777" />
        </Link>
      </div>

      <ul className={styles.menuList}>
        {/* CASA DIRIGE A ADOPCIONES */}
        <Link to="/adoption-requests" title="Adopciones" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/adoption-requests' ? styles.active : ''}`}>
            <Home size={24} />
          </li>
        </Link>

        {/* NUEVA OPCIÓN: REGISTRO DE MASCOTA */}
        <Link to="/pet-register" title="Registrar Mascota" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/pet-register' ? styles.active : ''}`}>
            <PawPrint size={24} />
          </li>
        </Link>

        <Link to="/shelter" title="Refugios" className={styles.link}>
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
        {/* CERRAR SESIÓN TE REDIRIGE AL LOGIN */}
        <Link to="/login" title="Cerrar Sesión" className={styles.link}>
          <button className={styles.logoutBtn}>
            <LogOut size={24} />
          </button>
        </Link>
      </div>
    </nav>
  );
}