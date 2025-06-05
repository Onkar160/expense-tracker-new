import styles from "./HomePage.module.css";
import ExpenseTracker from "../../sections/ExpenseTracker/ExpenseTracker";
import {useState, useEffect} from "react";

export default function HomePage() {
    
    // walletBalance and expenses state
    const [walletBalance, setWalletBalance] = useState(0);
    const [expenses, setExpenses] = useState(0);

  return (
    <div className={styles.container}>
      <ExpenseTracker />
    </div>
  );
}
