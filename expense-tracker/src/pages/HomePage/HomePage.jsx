import styles from "./HomePage.module.css";
import ExpenseTracker from "../../sections/ExpenseTracker/ExpenseTracker";
import { useState, useEffect } from "react";
import MyContext from "../../context";
import RecentTransactions from "../../sections/RecentTransactions/RecentTransactions";
import TopExpenses from "../../sections/TopExpenses/TopExpenses";

export default function HomePage() {
  // walletBalance and expenses state
  const [walletBalance, setWalletBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(['Food', 'Entertainment', 'Travel']);

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
      value={{ walletBalance, setWalletBalance, expenses, setExpenses, categories, setCategories }}
    >
      <div className={styles.container}>
        <ExpenseTracker />
        <div className={styles.section_wrapper}>
          <RecentTransactions />
          <TopExpenses />
        </div>
      </div>
    </MyContext.Provider>
  );
}
