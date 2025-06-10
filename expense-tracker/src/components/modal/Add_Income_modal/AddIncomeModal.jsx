import styles from "./AddIncomeModal.module.css";
import { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import MyContext from "../../../context";

export default function AddIncomeModal({ setOpen }) {
  const { walletBalance, setWalletBalance } = useContext(MyContext);

  const { enqueueSnackbar } = useSnackbar();

  //input on change state
  const [incomeAmount, setIncomeAmount] = useState(null);

  //handling input on change and updating incomeAmount
  const handleInputAmount = (e) => {
    setIncomeAmount(Number(e.target.value));
  };

  //handling wallet balance on clicking on add amount button
  const handleAddAmount = (e) => {
    //safety check if user is trying to add more than 1000000000 amount printing msg
    e.preventDefault();
    if (incomeAmount + walletBalance > 1000000000) {
      enqueueSnackbar("Cannot accept amount more than 1000000000", {
        variant: "warning",
      });
      return;
    }
    const oldAmount = Number(localStorage.getItem("walletBalance"));
    localStorage.setItem("walletBalance", oldAmount + incomeAmount);
    setWalletBalance((prevAmount) => prevAmount + incomeAmount);
    setOpen(false);
  };

  //handle cancel button
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Balance</h1>
      <form className={styles.wrapper} onSubmit={handleAddAmount}>
        <input
          type="number"
          placeholder="Income Amount"
          onChange={handleInputAmount}
          required
        />
        <button id={styles.add_balance_button} type="submit">
          Add Balance
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
