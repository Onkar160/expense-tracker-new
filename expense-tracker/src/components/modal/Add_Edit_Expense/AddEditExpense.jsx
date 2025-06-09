import MyContext from "../../../context";
import styles from "./AddEditExpense.module.css";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useSnackbar } from "notistack";

export default function AddEditExpense({ type, setOpen }) {
  //snackbar
  const { enqueueSnackbar } = useSnackbar();

  // state to store form data on change
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  // importing states with context
  const { walletBalance, setWalletBalance, expenses, setExpenses } =
    useContext(MyContext);

  // //For side effects check
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData])

  // To handle the input and store form data on change
  const handleInput = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // To close form on clicking on cancel button
  const closeForm = () => {
    setOpen(false);
  };

  // To add expenses and also saving it to local storage on clicking on add expense button
  const addExpense = (e) => {
    e.preventDefault();
    if (Number(formData.price) > walletBalance) {
      enqueueSnackbar(
        "Amount is higher than wallet balance, Please lower your amount and try again",
        { variant: "warning" }
      );
      return;
    }
    const dateString = formData.date;
    const formattedDate = moment(dateString).format("MMMM D, YYYY");
    const newExpense = {
      ...formData,
      date: formattedDate,
      id: expenses.length,
    };
    const updatedExpenses = [...expenses, newExpense];

    console.log(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    const oldWalletBalance = Number(localStorage.getItem("walletBalance"));
    localStorage.setItem("walletBalance", oldWalletBalance - newExpense.price);
    setWalletBalance(walletBalance - Number(newExpense.price));
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Expenses</h1>
      <form className={styles.wrapper} onSubmit={addExpense}>
        <input
          name="title"
          placeholder="Title"
          type="text"
          onChange={handleInput}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleInput}
          required
        />
        <select
          name="category"
          className={styles.selector}
          defaultValue=""
          onChange={handleInput}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          name="date"
          type="date"
          className={`${styles.date} ${
            formData.date ? styles.black_date : styles.gray_date
          }`}
          onChange={handleInput}
          required
        />
        <button type="submit" className={styles.submit_button}>
          Add Expense
        </button>
        <button
          type="button"
          className={styles.cancel_button}
          onClick={closeForm}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
