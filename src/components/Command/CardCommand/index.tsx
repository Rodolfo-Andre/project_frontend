import { IDishGet } from "@/interfaces";
import { Box, Button, Card, CardMedia, Modal, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
 

interface ICardCommandComponent {
  data: IDishView;
  handleRemove: (id: string) => void;
  showModal: () => void;
  handleEdit: (id: string) => void;
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
  handleEdit
}) => {
  

 

  return (
     <> 
      <Card
     
     sx={{ mb: 1, borderRadius: 1, boxShadow: 1, width: '100%', height: 150,overflow: 'hidden' }}
     >
       <Box display="flex" alignItems="center">
         <CardMedia
           component="img"
           sx={{ width: "20%", height: 150 }}
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
          justifyContent="space-around"
         alignItems="center"
         ml="auto">
 
           <IconButton 
           onClick={() => handleRemove(data.id)}
            color="error"
            size="large"
           aria-label="delete">
             <DeleteIcon />
             
           </IconButton>
           
           <IconButton
             onClick={() => handleEdit(data.id)}
              color="primary"
             size="large"
             aria-label="edit">
              <ModeEditIcon />
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
