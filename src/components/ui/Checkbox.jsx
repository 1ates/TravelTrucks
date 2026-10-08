import styles from './Checkbox.module.css';

function Checkbox({ label, checked, onChange, icon }) {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <span className={styles.checkbox}>
        {icon && <span className={styles.icon}>{icon}</span>}
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
