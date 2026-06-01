import styles from "../components/member/AddComponent.module.css";
import AddComponent from "../components/member/AddComponent";

export default function AddPage() {
  return (
    <div className={styles.container}>
      <AddComponent />
    </div>
  );
}
