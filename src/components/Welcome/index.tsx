import { Typography, Box } from "@mui/material";
import { RestaurantMenu } from "@mui/icons-material";
import { ContentCenter } from "@/components";

const Welcome = () => {
  return (
    <ContentCenter sxProps={{ flexGrow: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">
          Bienvenido a nuestro sistema de comandas
        </Typography>

        <RestaurantMenu sx={{ fontSize: "10rem" }} />
      </Box>
    </ContentCenter>
  );
};

export default Welcome;
