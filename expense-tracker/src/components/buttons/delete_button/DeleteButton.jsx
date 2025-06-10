import { MdOutlineCancel } from "react-icons/md";
import styles from "./DeleteButton.module.css";
import {useState, useContext} from "react";
import MyContext from "../../../context";

export default function DeleteButton({id}) {
    const [isOpen, setOpen] = useState(false);
    const {expenses, setExpenses} = useContext(MyContext);

    const deleteExpense = (id, expenses) => {
        const newExpenses = expenses.map(expense => expense.id !== id);
        localStorage.setExpenses("expenses", JSON.stringify(newExpenses));
        setExpenses(newExpenses);
    }

    return (
        <button className={styles.button}>
            <MdOutlineCancel className={styles.icon} />
        </button>
    )
}