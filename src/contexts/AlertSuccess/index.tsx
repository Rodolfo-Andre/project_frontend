import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createContext, useState, ReactNode } from "react";
import { useOpenClose } from "@/hooks";

interface IAlertContext {
  handleOpen: (message: string) => void;
}

const AlertContext = createContext<IAlertContext>({
  handleOpen: () => {},
});

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, openMessage, closeMessage] = useOpenClose(false);
  const [text, setText] = useState("");

  const handleOpen = (message: string) => {
    setText(message);
    openMessage();
  };

  return (
    <AlertContext.Provider value={{ handleOpen }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={(_event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          closeMessage();
        }}
      >
        <Alert
          variant="filled"
          onClose={closeMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
