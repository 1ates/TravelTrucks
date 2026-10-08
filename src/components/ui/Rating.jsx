import PropTypes from 'prop-types';
import styles from './Rating.module.css';

function Rating({ value, maxStars = 5, showValue = true }) {
  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {Array.from({ length: maxStars }, (_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < value ? styles.filled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
    </div>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
  showValue: PropTypes.bool,
};

export default Rating;
