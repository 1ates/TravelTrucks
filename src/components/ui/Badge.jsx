import PropTypes from 'prop-types';
import Icon from './Icon';
import styles from './Badge.module.css';

function Badge({ children, label, icon, variant = 'default' }) {
  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      {icon && <Icon name={icon} size={16} className={styles.icon} />}
      <span className={styles.text}>{children || label}</span>
    </div>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.string,
};

export default Badge;
