import { ITableGetCommand } from "@/interfaces";
import { ICommandGet } from "@/interfaces/ICommand/ICommand";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const styles = {
  disabled: {
    color: "#0D6EFD",
  },
  buttonEdit: {
    backgroundColor: "#FFC107",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },

  buttonDelete: {
    backgroundColor: "#DC3545",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#DC3545",
    },
  },
};

interface IComandDetailProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  dataCommand: ICommandGet | undefined;
}

export const ComandDetail: React.FC<IComandDetailProps> = ({
  onDelete,
  onEdit,
  dataCommand,
}) => {
  const [data, setData] = useState({} as ICommandGet);
  useEffect(() => {
    if (dataCommand) {
      setData(dataCommand);
    }


  }, [dataCommand]);


  return (
    <Box
      sx={{
        height: "400px",
      }}
    >
      {data && (
        <>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#637381",
              textAlign: "center",
              mb: 2,
            }}
            variant="h6"
          >
            Detalles de la Mesa
          </Typography>

          <TextField
            disabled
            id="id-comanda"
            label="Numero de Mesa"
            value={data?.tableRestaurant?.numTable ?? ""}
            variant="outlined"
            inputProps={{
              style: {
                WebkitTextFillColor: "#637381",
              },
            }}
            InputLabelProps={{
              style: styles.disabled,
            }}
            fullWidth
          />

          <TextField
            disabled
            id="id-comanda"
            label="Numero de Asientos"
            value={data?.tableRestaurant?.numSeats ?? ""}
            variant="outlined"
            sx={{
              mt: 2,
            }}
            inputProps={{
              style: {
                WebkitTextFillColor: "#637381",
              },
            }}
            InputLabelProps={{
              style: styles.disabled,
            }}
            fullWidth
          />

          <TextField
            disabled
            id="id-comanda"
            label="Estado de la Comanda"
            value={data?.tableRestaurant?.stateTable ?? ""}
            variant="outlined"
            sx={{
              mt: 2,
            }}
            inputProps={{
              style: {
                WebkitTextFillColor: "#637381",
              },
            }}
            InputLabelProps={{
              style: styles.disabled,
            }}
            fullWidth
          />

          <Box sx={{ mt: 2 }} display="flex" flexDirection={"column"} gap={1}>
            <Button
            disabled={data?.statesCommand?.state == "Paid" ?? false}
            onClick={() => onEdit(data?.id)} sx={styles.buttonEdit}>
              Editar
            </Button>

            <Button onClick={() => onDelete(data?.id)} sx={styles.buttonDelete}>
              Eliminar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
