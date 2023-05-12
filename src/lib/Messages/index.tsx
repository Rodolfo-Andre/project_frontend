import Typography from "@mui/material/Typography";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Router from "next/router";

const MySwal = withReactContent(Swal);

const showWelcomeMessage = () => {
  MySwal.fire({
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

export { showWelcomeMessage };
