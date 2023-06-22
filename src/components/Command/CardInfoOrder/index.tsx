import React from "react";
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Interface } from "readline";


interface ICardInfoOrder {
    title : string;
    total : number;
}

const CardInfoOrder:React.FC<ICardInfoOrder> = ({title,total}) => {
  return (
    <Card sx={{ height: 90, display: "flex", flexDirection: "column",flexShrink:0 }}>
      <CardActionArea sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column",width : "70%" }}>
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
               Total : S./{total}
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
          image="https://res.cloudinary.com/dpfhjk0sw/image/upload/v1686789240/dish/xrfuvtjcie3imbfunvi2.jpg"
          alt="img"
        />
      </CardActionArea>
    </Card>
  );
};

export default CardInfoOrder;
