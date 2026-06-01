import styles from "./Avator.module.css";

export default function Avator() {
  return (
    <div className={styles.avatorContainer}>
      <img src="/images/avator/avator2.png" className={styles.djImage} />
    </div>
  );
}
