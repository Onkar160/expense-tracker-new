import styles from "./ExpenseTracker.module.css";
import AddButton from "../../components/buttons/add_button/AddButton";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context";

export default function ExpenseTracker() {
  const { walletBalance, setWalletBalance, expenses, setExpenses } =
    useContext(MyContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (expenses.length) {
      let finalAmount = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotalAmount(finalAmount);
    }
  }, []);

  return (
    <>
      <h1 className={styles.title}>Expense Tracker</h1>
      <section className={styles.container}>
        <section className={styles.article_section}>
          <article className={styles.article}>
            <p className={styles.headings}>
              Wallet Balance:{" "}
              <span
                style={{
                  fontSize: "25px",
                  color: "#9DFF5B",
                  fontWeight: "700",
                }}
              >
                {/* 1000000000 */}₹{walletBalance}
              </span>
            </p>
            <AddButton type="balance" />
          </article>
          <article className={styles.article}>
            <p className={styles.headings}>
              Expenses:{" "}
              <span
                style={{
                  fontSize: "25px",
                  color: "#F4BB4A",
                  fontWeight: "700",
                }}
              >
                ₹{totalAmount}
              </span>
            </p>
            <AddButton type="expense" />
          </article>
        </section>
      </section>
    </>
  );
}
