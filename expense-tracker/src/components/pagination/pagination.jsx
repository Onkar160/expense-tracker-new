import styles from "./pagination.module.css";
import { TbPizza } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { LuCarTaxiFront } from "react-icons/lu";
import { useState, useEffect } from "react";
import DeleteButton from "../buttons/delete_button/DeleteButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Pagination({ expenses, setExpenses }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const [slicedExpenses, setSlicedExpenses] = useState([]);

  const handlePrevButton = (e) => {
    console.log(e);
    setCurrentPage((prevInd) => prevInd - 1);
  };

  const handleNextButton = (e) => {
    console.log(e);
    setCurrentPage((prevInd) => prevInd + 1);
  };

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSlicedExpenses(expenses.slice(startIndex, endIndex));
  }, [currentPage, expenses]);

  return (
    <div className={styles.container}>
      <div className={styles.transaction_wrapper}>
        {slicedExpenses.length === 0 && (
          <p className={styles.no_transaction}>No Transactions!</p>
        )}
        {slicedExpenses.map((expense) => {
          return (
            <div className={styles.transaction} key={expense.id}>
              <div className={styles.expense_icon}>
                {expense.category === "Food" && <PizzaIcon />}
                {expense.category === "Entertainment" && <MovieIcon />}
                {expense.category === "Travel" && <CarIcon />}
                <div className={styles.expense_name}>
                  <p>{expense.title}</p>
                  <p>
                    <span style={{ color: "gray" }}>{expense.date}</span>
                  </p>
                </div>
              </div>
              <div className={styles.expense_price}>
                <span
                  style={{
                    color: "#F4BB4A",
                    fontWeight: "800",
                    fontSize: "17px",
                  }}
                >
                  ₹{expense.price}
                </span>
                <div className={styles.delete_edit_wrapper}>
                  <DeleteButton id={expense.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.button_wrapper} ${
          !slicedExpenses.length && styles.display_none
        } ${expenses.length <= itemsPerPage && styles.display_none}`}
      >
        <button
          style={{
            borderRadius: "40%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          type="button"
          className={`${currentPage + 1 == 1 && styles.button_hide}`}
          onClick={handlePrevButton}
        >
          <ArrowLeftIcon />
        </button>
        <button
          style={{
            width: "43px",
            height: "43px",
            borderRadius: "8px",
            backgroundColor: "#43967B",
            border: "none",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <span style={{ fontSize: "25px", color: "white" }}>
            {currentPage + 1}
          </span>
        </button>
        <button
          style={{
            borderRadius: "40%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          type="button"
          name="nextButton"
          className={`${currentPage + 1 == totalPages && styles.button_hide}`}
          onClick={handleNextButton}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

const PizzaIcon = () => {
  return (
    <TbPizza
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "30px",
        borderRadius: "50%",
        transform: "rotate(180deg)",
      }}
    />
  );
};

const MovieIcon = () => {
  return (
    <BiMoviePlay
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "30px",
        borderRadius: "50%",
      }}
    />
  );
};

const CarIcon = () => {
  return (
    <LuCarTaxiFront
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "30px",
        borderRadius: "50%",
      }}
    />
  );
};

const ArrowLeftIcon = () => {
  return (
    <FaArrowLeft
      style={{
        padding: "8px",
        fontSize: "16px",
        width: "20px",
        height: "20px",
        paddingTop: "12px",
      }}
      name="prevIcon"
    />
  );
};

const ArrowRightIcon = () => {
  return (
    <FaArrowRight
      style={{
        padding: "8px",
        fontSize: "16px",
        width: "20px",
        height: "20px",
        paddingTop: "12px",
      }}
      name="nextIcon"
    />
  );
};
