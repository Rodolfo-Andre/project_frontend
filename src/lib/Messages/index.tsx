import Typography from "@mui/material/Typography";
import Dangerous from "@mui/icons-material/Dangerous";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import withReactContent, { ReactElementOr } from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Router from "next/router";

interface IShowErrorMessage {
  title: string;
  contentHtml: ReactElementOr<"html">;
}

const ReactSwal = withReactContent(Swal);

const showWelcomeMessage = () => {
  ReactSwal.fire({
    title: (
      <Typography fontSize={24}>
        ¡Bienvenido! Haz iniciado sesión correctamente.
      </Typography>
    ),
    confirmButtonText: "Aceptar",
    icon: "success",
    target: "body",
    allowOutsideClick: false,
    willClose: () => {
      Router.replace("/");
    },
  });
};

const showErrorMessage = ({ title, contentHtml }: IShowErrorMessage) => {
  ReactSwal.fire({
    title,
    customClass: {
      icon: "custom-icon",
      actions: "custom-actions",
      cancelButton: "custom-cancel",
    },
    iconHtml: (
      <Dangerous
        sx={{
          display: "block",
          margin: "auto",
          fontSize: "5rem",
        }}
        color="error"
      />
    ),
    html: contentHtml,
    target: "body",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "CERRAR",
  });
};

const showInformationMessage = ({ title, contentHtml }: IShowErrorMessage) => {
  ReactSwal.fire({
    title,
    customClass: {
      icon: "custom-icon",
      actions: "custom-actions",
      cancelButton: "custom-confirm-create custom-confirm",
    },
    iconHtml: (
      <HelpCenterIcon
        sx={{
          display: "block",
          margin: "auto",
          fontSize: "5rem",
          color: "#0D6EFD",
        }}
      />
    ),
    html: contentHtml,
    target: "body",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "CERRAR",
  });
};

const showSuccessToastMessage = (title: string) => {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  }).fire({
    icon: "success",
    title,
  });
};

export {
  showWelcomeMessage,
  showErrorMessage,
  showSuccessToastMessage,
  showInformationMessage,
};
