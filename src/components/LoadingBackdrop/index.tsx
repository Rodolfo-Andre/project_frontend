import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const LoadingBackdrop = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        flexDirection: "column",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
      <Typography>Cargando...</Typography>
    </Backdrop>
  );
};

export default LoadingBackdrop;
