import MyContext from "../../../context";
import styles from "./AddEditExpense.module.css";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
moment.suppressDeprecationWarnings = true;

export default function AddEditExpense({ type, setOpen, id }) {
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
  const { walletBalance, setWalletBalance, expenses, setExpenses, categories } =
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
  // And to edit expenses
  // conditional function call
  const add_edit_expense = (e, type, id) => {
    e.preventDefault();
    if (Number(formData.price) <= 0) {
      enqueueSnackbar(
        "Invalid amount, please change your amount and try again",
        { variant: "warning" }
      );
      return;
    }
    if (type === "edit_expense" && id) {
      editExpense(id);
    } else {
      addExpense();
    }
  };

  // To Add the expenses
  const addExpense = () => {
    if (Number(formData.price) > walletBalance) {
      enqueueSnackbar(
        "Amount is higher than wallet balance, Please lower your amount and try again",
        { variant: "warning" }
      );
      return;
    }
    const dateString = formData.date;
    // console.log(dateString);
    const formattedDate = moment(dateString).format("MMMM D, YYYY");
    const newExpense = {
      ...formData,
      date: formattedDate,
      id: uuidv4(),
    };
    const updatedExpenses = [...expenses, newExpense];

    // console.log(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    const oldWalletBalance = Number(localStorage.getItem("walletBalance"));
    localStorage.setItem("walletBalance", oldWalletBalance - newExpense.price);
    setWalletBalance(walletBalance - Number(newExpense.price));
    setOpen(false);
  };

  //To edit expenses
  const editExpense = (id) => {
    //finding the expense with the id
    const expense = expenses.find((expense) => expense.id === id);
    let currentWalletBalance = Number(walletBalance);
    const oldExpenseAmount = Number(expense.price);
    const newExpenseAmount = Number(formData.price);
    currentWalletBalance = currentWalletBalance + oldExpenseAmount;

    //validating the amount that user is trying to add is more than wallet balance or not.
    if (newExpenseAmount > currentWalletBalance) {
      enqueueSnackbar(
        "You do not have enough amount in your wallet, please lower your amount and try again",
        { variant: "warning" }
      );
    }
    let updatedWalletBalance = currentWalletBalance - newExpenseAmount;
    let formattedDate = moment(formData.date).format("MMMM D, YYYY");
    // console.log(updatedWalletBalance, formattedDate);

    // updating expense with new input data after all validations passed
    expense.title = formData.title;
    expense.price = formData.price;
    expense.date = formattedDate;
    expense.category = formData.category;
    // console.log(expense);
    
    //Updating expenses with new updated expense
    const updatedExpenses = expenses.map(anExpense => anExpense.id === expense.id ? {...expense} : anExpense);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    //Updating wallet balance
    setWalletBalance(updatedWalletBalance);
    localStorage.setItem("walletBalance", updatedWalletBalance);

    //closing form
    setOpen(false);
  };

  //Filling in all input fields as soon as user clicks on edit expenses
  useEffect(() => {
    if (type === "edit_expense" && id) {
      const expense = expenses.find((expense) => expense.id === id);
      const formattedDate = moment(expense.date).format("YYYY-MM-DD");
      setFormData({
        title: expense.title,
        price: expense.price,
        category: expense.category,
        date: formattedDate,
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {type === "edit_expense" && id ? "Edit Expenses" : "Add Expenses"}
      </h1>
      <form
        className={styles.wrapper}
        onSubmit={(e) => add_edit_expense(e, type, id)}
      >
        <input
          name="title"
          placeholder="Title"
          type="text"
          onChange={handleInput}
          value={formData.title}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleInput}
          value={formData.price}
          required
        />
        <select
          name="category"
          className={styles.selector}
          value={formData.category}
          onChange={handleInput}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option value={category} key={`key${index}`}>
              {category}
            </option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          className={`${styles.date} ${
            formData.date ? styles.black_date : styles.gray_date
          }`}
          onChange={handleInput}
          value={formData.date}
          required
        />
        <button type="submit" className={styles.submit_button}>
          {type === "edit_expense" && id ? "Edit Expense" : "Add Expense"}
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
