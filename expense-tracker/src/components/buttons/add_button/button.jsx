import styles from "./button.module.css";
import Modal from "../../modal/modal";
import { useState, useEffect } from "react";

export default function Button({ type }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {type === "balance" ? (
        <AddIncomeButton setOpen={setOpen} isOpen={isOpen} type={type} />
      ) : (
        <AddExpenseButton setOpen={setOpen} isOpen={isOpen} type={type} />
      )}
    </>
  );
}

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
