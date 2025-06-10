import { MdOutlineCancel } from "react-icons/md";
import styles from "./DeleteButton.module.css";
import { useState, useContext } from "react";
import MyContext from "../../../context";
import { useSnackbar } from "notistack";

export default function DeleteButton({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { expenses, setExpenses, setWalletBalance } = useContext(MyContext);

  const deleteExpense = (id, expenses) => {
    const deletedExpense = expenses.find((expense) => expense.id === id);
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    // console.log(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    setExpenses(newExpenses);
    let oldAmount = Number(localStorage.getItem("walletBalance"));
    let newAmount = oldAmount + Number(deletedExpense.price);
    localStorage.setItem("walletBalance", newAmount);
    setWalletBalance(newAmount);
    enqueueSnackbar("Deleted Successfully!", { variant: "success" });
  };

  return (
    <button
      className={styles.button}
      onClick={() => deleteExpense(id, expenses)}
    >
      <MdOutlineCancel className={styles.icon} />
    </button>
  );
}
