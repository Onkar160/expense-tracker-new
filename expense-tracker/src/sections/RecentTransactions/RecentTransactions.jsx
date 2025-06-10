import styles from "./RecentTransactions.module.css";
import { useContext, useEffect } from "react";
import MyContext from "../../context";
import Pagination from "../../components/pagination/pagination";

export default function RecentTransactions() {
    const {expenses, setExpenses} = useContext(MyContext);

    // useEffect(() => {
    //     console.log(expenses);
    // }, [expenses]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <div className={styles.wrapper}>
                <Pagination expenses={expenses} setExpenses={setExpenses} />
            </div>
        </div>
    )
}