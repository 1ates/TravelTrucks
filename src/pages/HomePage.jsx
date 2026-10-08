import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import heroImage from '../assets/hero-image.jpg';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <img
          src={heroImage}
          alt="Campervan parked in scenic nature - TravelTrucks"
          className={styles.heroImage}
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="1067"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>Campers of your dreams</h2>
            <p className={styles.heroSubtitle}>
              You can find everything you want in our catalog
            </p>
          </div>
          <Link to="/catalog">
            <Button variant="primary" size="large">
              View Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
