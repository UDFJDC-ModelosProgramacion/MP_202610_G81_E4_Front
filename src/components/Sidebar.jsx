import { Home, Building2, Calendar, Settings, LogOut, Heart } from 'lucide-react'; // Cambiamos Dog por Building2
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className={styles.sidebarMini}>
      <div className={styles.logo}>
        <Link to="/" title="Mascota G81">
          <Heart size={28} color="#db2777" fill="#db2777" />
        </Link>
      </div>

      <ul className={styles.menuList}>
        <Link to="/" title="Inicio" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/' ? styles.active : ''}`}>
            <Home size={24} />
          </li>
        </Link>

        {/* --- CAMBIO DE ICONO AQUÍ --- */}
        <Link to="/shelter" title="Fichas de Refugios" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/shelter' ? styles.active : ''}`}>
            {/* El icono Building2 representa la institución o refugio */}
            <Building2 size={24} />
          </li>
        </Link>

        <Link to="/trial-stay" title="Pruebas de Convivencia" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === '/trial-stay' ? styles.active : ''}`}>
            <Calendar size={24} />
          </li>
        </Link>

        <Link to="/register" title="Gestión de Cuentas" className={styles.link}>
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