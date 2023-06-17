import { IDishGet } from "@/interfaces";
import { Box, Button, Card, CardMedia, Modal, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';

 

interface ICardCommandComponent {
  data: IDishView;
  handleRemove: (id: string) => void;
  showModal: () => void;
}

interface IDishView extends IDishGet {
  quantity: number;
  observation: string;
  total: number;

  
}

const CardCommandComponent: FC<ICardCommandComponent> = ({
  data,
  showModal,
  handleRemove,
}) => {
  

 

  return (
     <> 
      <Card
     
     sx={{ mb: 1, borderRadius: 1, boxShadow: 1, width: '100%', height: 120 }}
     >
       <Box display="flex" alignItems="center">
         <CardMedia
           component="img"
           sx={{ width: "20%", height: 120, backgroundSize: "contain",backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
           image={data.imgDish}
           alt="Imagen del producto"
         />
         <Box ml={2}>
           <Typography variant="h6" component="div">
             {data.nameDish}
           </Typography>
           <Typography variant="body1" color="text.secondary">
             S./{data.total}
           </Typography>
         </Box>
         <Box 
         sx={{ ml: 'auto'}}
         display='flex'
         flexDirection="column"
         justifyContent="space-between"
         alignItems="center"
         gap={1}
         ml="auto">
 
           <IconButton 
           onClick={() => handleRemove(data.id)}
            color="error"
            size="large"
           aria-label="delete">
             <DeleteIcon />
           </IconButton>
           <IconButton 
           onClick={showModal}
           color="primary"
           size="large"
           aria-label="info">
             <InfoIcon />
           </IconButton>
         </Box>
       </Box>
     </Card>


    

     </>
    
  );
};

export default CardCommandComponent;
