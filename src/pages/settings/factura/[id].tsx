import { ContentBox, Layout } from "@/components";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IMetodoPago, ITipoComprobante, facturaServices } from "@/services/apis/factura-services";
import { AxiosError } from "axios";
import { handleError } from "@/utils";
import { ICashGet } from "@/interfaces";

const Facturar = () => {
  const [cboData, setCboData] = useState({
    comandas: [] as ICashGet[],
    metodosPago: [] as IMetodoPago[],
    tipoComprobante: [] as ITipoComprobante[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          facturaServices.cboComandas(),
          facturaServices.cboMetodosPago(),
          facturaServices.cboTipoComprobante(),
        ];
        const [resCommads, resMethods, resTypeC] = await Promise.all(
          promises
        );
        setCboData({
          comandas: [],
          metodosPago: resMethods as IMetodoPago[],
          tipoComprobante: resTypeC as ITipoComprobante[],

        });
      } catch (error) {
        const errores = error as AxiosError;
        handleError(errores);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <ContentBox
        sxProps={{
          width: "50%",
          height: "800px",
          margin: "auto",
          padding: 2,
        }}
      >
        <Typography
          sx={{
            mt: 2,
            mb: 3,
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#637381",
          }}
        >
          Factura
        </Typography>

        <FormControl fullWidth margin="normal">
          <TextField
            id="outlined-basic"
            label="Cliente-DNI(Opcional)"
            variant="filled"
            value={"3"}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="plato-categoria">Tipo de Comprobante</InputLabel>
          <Select
            id="demo-simple-select"
            labelId="plato-categoria"
            value={""}
            label="Categoria"
            // onChange={(e) => setPlato(e.target.value as string)}
          >
            {/* {Cajas.map((caja) => (
              <MenuItem key={caja.id} value={caja.id}>
                {caja.establishment.name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="plato-categoria">Caja</InputLabel>
          <Select
            id="demo-simple-select"
            labelId="plato-categoria"
            value={""}
            label="Categoria"
            // onChange={(e) => setPlato(e.target.value as string)}
          >
            {/* {Cajas.map((caja) => (
              <MenuItem key={caja.id} value={caja.id}>
                {caja.establishment.name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="plato-categoria">Metodo de Pago</InputLabel>
          <Select
            id="demo-simple-select"
            labelId="plato-categoria"
            value={""}
            label="Categoria"
            // onChange={(e) => setPlato(e.target.value as string)}
          >
            {/* {MetodoPago.map((metodo) => (
              <MenuItem key={metodo.id} value={metodo.id}>
                {metodo.paymethod}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="outlined-basic"
            label="Monto"
            variant="filled"
            value={"3"}
          />
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => console.log("hola")}
          color="primary"
        >
          Generar Comanda <AddIcon sx={{ mx: 1 }} />
        </Button>
      </ContentBox>
    </Layout>
  );
};

export default Facturar;
