import styles from "./HomePage.module.css";
import ExpenseTracker from "../../sections/ExpenseTracker/ExpenseTracker";
import { useState, useEffect } from "react";
import MyContext from "../../context";

export default function HomePage() {
  // walletBalance and expenses state
  const [walletBalance, setWalletBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);

  //Setting wallet balance to 5k by default on first visit and saving to localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance");
    const storedExpenses = localStorage.getItem("expenses");
    if (storedBalance === null) {
      localStorage.setItem("walletBalance", 5000);
      setWalletBalance(5000);
    } else {
      setWalletBalance(Number(storedBalance));
    }

    if (storedExpenses === null) {
      localStorage.setItem("expenses", JSON.stringify([]));
      setExpenses([]);
    } else {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  return (
    <MyContext.Provider
      value={{ walletBalance, setWalletBalance, expenses, setExpenses }}
    >
      <div className={styles.container}>
        <ExpenseTracker />
      </div>
    </MyContext.Provider>
  );
}
