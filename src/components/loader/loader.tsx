import styles from "./index.module.css";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className={styles.loader}></div>
    </div>
  );
}
