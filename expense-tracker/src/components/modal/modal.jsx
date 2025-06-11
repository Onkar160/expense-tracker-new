import ReactModal from "react-modal";
import AddIncomeModal from "./Add_Income_modal/AddIncomeModal";
import AddEditExpense from "./Add_Edit_Expense/AddEditExpense";

export default function Modal({ isOpen, setOpen, type, id }) {
  // console.log(type);
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alighItems: "center",
          },
          content: {
            backgroundColor: "#EFEFEFD9",
            height: "min-content",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "15px",
            opacity: "0.85",
            width: "fit-content",
          },
        }}
      >
        {type === "add_balance" && <AddIncomeModal setOpen={setOpen} />}
        {type === "add_expense" && <AddEditExpense setOpen={setOpen} />}
        {type === "edit_expense" && id && <AddEditExpense setOpen={setOpen} id={id} type={type} />}
      </ReactModal>
    </>
  );
}
