import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditButton.module.css";
import { useState } from "react";
import Modal from "../../modal/modal";

export default function EditButton({id}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setOpen(true)}>
        <MdOutlineEdit className={styles.icon} />
      </button>
      <Modal setOpen={setOpen} isOpen={isOpen} type={"edit_expense"} id={id} />
    </>
  );
}
