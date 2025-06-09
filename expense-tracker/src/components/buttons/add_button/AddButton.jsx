import styles from "./button.module.css";
import Modal from "../../modal/modal";
import { useState, useEffect } from "react";

export default function AddButton({ type }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {type === "add_balance" ? (
        <AddIncomeButton setOpen={setOpen} isOpen={isOpen} type={type} />
      ) : (
        <AddExpenseButton setOpen={setOpen} isOpen={isOpen} type={type} />
      )}
    </>
  );
}

//The add income button
const AddIncomeButton = ({ setOpen, isOpen, type }) => {
  return (
    <>
      <button
        className={styles.add_button}
        id={styles.income}
        onClick={() => setOpen(true)}
      >
        <span>+ Add Income</span>
      </button>
      <Modal isOpen={isOpen} setOpen={setOpen} type={type} />
    </>
  );
};


//The add expense button
const AddExpenseButton = ({ setOpen, isOpen, type }) => {
  return (
    <>
      <button
        className={styles.add_button}
        id={styles.expense}
        onClick={() => setOpen(true)}
      >
        <span>+ Add Expense</span>
      </button>
      <Modal isOpen={isOpen} setOpen={setOpen} type={type} />
    </>
  );
};
