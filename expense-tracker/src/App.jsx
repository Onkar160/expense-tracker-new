import HomePage from "./pages/HomePage/HomePage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <HomePage />
      </SnackbarProvider>
    </>
  );
}

export default App;
