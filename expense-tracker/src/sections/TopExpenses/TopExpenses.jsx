import BarChart from "../../components/bar_chart/bar_chart";
import { useState, useEffect, useContext } from "react";
import MyContext from "../../context";
import styles from "./TopExpenses.module.css";

export default function TopExpenses() {
  const { expenses, categories } = useContext(MyContext);
  const [categoryMap, setCategoryMap] = useState({});
  useEffect(() => {
    let tempObj = {};
    categories.forEach((category) => {
      tempObj[category] = 0;
    });
    setCategoryMap(tempObj);
  }, [categories]);
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Top Expenses</h2>
      <BarChart categories={categories} expenses={expenses} categoryMap={categoryMap} />
    </div>
  );
}
