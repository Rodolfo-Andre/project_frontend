import { Backdrop, CircularProgress, Typography } from "@mui/material";

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
