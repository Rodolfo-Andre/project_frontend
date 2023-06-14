import { ITableWithComand } from "@/interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

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

  buttonView: {
    width: "100%",
    backgroundColor: "#0D6EFD",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0D6EFD",
    },
  },
};

interface IComandDetailProps {
  table: ITableWithComand;
}

export const ComandDetail: React.FC<IComandDetailProps> = ({ table }) => {
  const handleDelete = (id: string) => {
    //  Swal.fire({
    //    title: "¿Estas seguro?",
    //    text: "No podras revertir esta accion",
    //    icon: "warning",
    //    showCancelButton: true,
    //    confirmButtonText: "Si, eliminar",
    //    cancelButtonText: "Cancelar",
    //  }).then(async (result) => {
    //    if (result.isConfirmed) {
    //      try {
    //        const elimando = await deleteCommand(id);
    //        Swal.fire(
    //          "Eliminado",
    //          "La comanda ha sido eliminada correctamente",
    //          "success"
    //        ).then(() => {
    //          window.location.reload();
    //        });
    //      } catch (error) {
    //        const errores = error as AxiosError;
    //        const mensaje = errores.response?.data as string;
    //        if (errores.response) {
    //          Swal.fire("Error", mensaje, "error");
    //        } else {
    //          Swal.fire("Error", "Ha ocurrido un error", "error");
    //        }
    //      }
    //    }
    //  });
  };

  return (
    <Box
      sx={{
        height: "400px",
      }}
    >
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
        id="id-mesa"
        label="Mesa"
        value={table.numTable}
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
        id="nro-asientos"
        label="Numero de Asientos"
        value={table.numSeats}
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
        id="estado-mesa"
        label="Estado"
        value={table.stateTable}
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
        <Link
          style={{
            display: "block",
            width: "100%",
          }}
          href={`/comandas/${table.numTable}`}
        >
          <Button sx={styles.buttonView}>Ver</Button>
        </Link>
      </Box>
    </Box>
  );
};
