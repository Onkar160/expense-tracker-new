import styles from "./ExpenseTracker.module.css";
import AddButton from "../../components/buttons/add_button/AddButton";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context";
import CustomPieChart from "../../components/pie_chart/PieChart";

export default function ExpenseTracker() {
  const { walletBalance, expenses, categories } =
    useContext(MyContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryMap, setCategoryMap] = useState({});

  // to update total expenses amount whenever user add expense
  useEffect(() => {
    let finalAmount = expenses.reduce(
      (acc, expense) => acc + Number(expense.price),
      0
    );
    setTotalAmount(finalAmount);
  }, [expenses]);

  useEffect(() => {
    let tempObj = {};
    categories.forEach(category => {
      tempObj[category] = 0;
    })
    setCategoryMap(tempObj);
  }, [categories])

  return (
    <>
      <h1 className={styles.title}>Expense Tracker</h1>
      <section className={styles.container}>
        {/* <section className={styles.article_section}> */}
          <article className={styles.article}>
            <p className={styles.headings}>
              Wallet Balance:{" "}
              <span
                style={{
                  fontSize: "26px",
                  color: "#9DFF5B",
                  fontWeight: "700",
                }}
              >
                {/* 1000000000 */}₹{walletBalance}
              </span>
            </p>
            <AddButton type="add_balance" />
          </article>
          <article className={styles.article}>
            <p className={styles.headings}>
              Expenses:{" "}
              <span
                style={{
                  fontSize: "26px",
                  color: "#F4BB4A",
                  fontWeight: "700",
                }}
              >
                ₹{totalAmount}
              </span>
            </p>
            <AddButton type="add_expense" />
          </article>
        {/* </section> */}
        <CustomPieChart expenses={expenses} categories={categories} categoryMap={categoryMap} />
      </section>
    </>
  );
}
