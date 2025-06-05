import styles from "./ExpenseTracker.module.css";

export default function ExpenseTracker() {
  return (
    <>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.container}></div>
    </>
  );
}
