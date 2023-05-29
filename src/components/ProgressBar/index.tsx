import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressBar = () => {
  return (
    <Box sx={{ width: "100%", zIndex: 111111, position: "absolute" }}>
      <LinearProgress sx={{ height: "2px" }} />
    </Box>
  );
};

export default ProgressBar;
