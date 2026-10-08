import PropTypes from 'prop-types';
import styles from './Radio.module.css';

function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
}) {
  return (
    <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.radio}></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Radio;
