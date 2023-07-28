import styles from "./Button.module.css";

function Button(props) {
  return (
    <button type="button" className={styles.error}>
      {props.children}
    </button>
  );
}

export default Button;
