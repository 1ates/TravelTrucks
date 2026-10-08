import { Link, useLocation } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoSvg} alt="TravelTrucks" />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={`${styles.navLink} ${location.pathname.startsWith('/catalog') ? styles.active : ''}`}
          >
            Catalog
          </Link>
        </nav>
        <div className={styles.spacer} />
      </div>
    </header>
  );
}

export default Header;
