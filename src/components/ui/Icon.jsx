import PropTypes from 'prop-types';
import iconsSvg from '../../assets/icons.svg';
import styles from './Icon.module.css';

function Icon({ name, size = 20, className = '', fill, stroke }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      aria-hidden="true"
    >
      <use href={`${iconsSvg}#icon-${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

export default Icon;
