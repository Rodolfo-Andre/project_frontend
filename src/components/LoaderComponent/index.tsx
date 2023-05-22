import LinearProgress from "@mui/material/LinearProgress";
import ContentCenter from "../ContentCenter";

const LoaderComponent = () => {
  return (
    <ContentCenter sxProps={{ flexGrow: 1 }}>
      <LinearProgress sx={{ height: "3px", width: "50%" }} />
    </ContentCenter>
  );
};

export default LoaderComponent;
