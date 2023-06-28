import React from "react";
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { Interface } from "readline";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICardInfoOrder {
  title: string;
  total: number;
  deleteListPayment: () => void;
}

const CardInfoOrder: React.FC<ICardInfoOrder> = ({
  title,
  total,
  deleteListPayment,
}) => {
  return (
    <Card
      sx={{
        height: 140,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
          <CardContent sx={{ py: 0 }}>
            <Typography
              fontWeight="bold"
              component="div"
              variant="h6"
              sx={{
                m: "1px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Total : S./{total.toFixed(2)}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: "30%",
            height: "100%",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
          image="https://res.cloudinary.com/dpfhjk0sw/image/upload/v1687921996/dish/metodo_pago.jpg"
          alt="img"
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={deleteListPayment}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default CardInfoOrder;
