import ReactModal from "react-modal";

export default function Modal({ isOpen, setOpen, type }) {
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
            alighItems: "center"
          },
          content: {
            backgroundColor: "rgba(255, 255, 255, 0.80)",
            width: "min-content",
            height: "min-content",
            position: "absolute",
            top: "50%", 
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "15px"
          },
        }}
      >
        <h1>Hi</h1>
      </ReactModal>
    </>
  );
}
