import { ContentBox, Layout } from "@/components";
import { Typography, Box, Grid } from "@mui/material";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React from "react";
import { InputForm } from "@/components/InputForm";
import Image from "next/image";

const style = {
  titulo: {
    m: 4,
    fontWeight: "bold",
    color: "#637381",
  },
  containerForm: {
    display: "flex",
    gap: "1rem",

    border: "2px solid #E0E0E0",
    borderRadius: "0.5rem",

    m: 4,
  },
};

const DetalleComanda = () => {
  return (
    <Layout>
      <ContentBox>
        <Typography sx={style.titulo} variant="h4">
          Detalle de la comanda
        </Typography>

        <Box sx={style.containerForm}>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              borderRight: "1px solid #E0E0E0",
              padding: 2,
            }}
          >
            <InputForm
              Icon={<Grid3x3OutlinedIcon color="primary" />}
              id="id-commmand"
              label="Id de la comanda"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />

            <InputForm
              Icon={<TableRestaurantIcon color="primary" />}
              id="number-table"
              label="Numero de mesa"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />

            <InputForm
              Icon={<PeopleAltIcon color="primary" />}
              id="cant-personas"
              label="Cantidad de personas"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />

            <InputForm
              Icon={<SmartScreenIcon color="primary" />}
              id="state-commmand"
              label="Estado de la comanda"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />

            <InputForm
              Icon={<AssignmentIndIcon color="primary" />}
              id="employee-commmand"
              label="Empleado"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />

            <InputForm
              Icon={<PriceChangeIcon color="primary" />}
              id="total-commmand"
              label="Total"
              value="1"
              onChange={() => {}}
              isErrored={false}
              errorText=""
            />
          </Box>

          <Box sx={{ width: "50%", height: "100%", padding: 2 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #000",
                borderRadius: "0.5rem",
                padding: 2,
                mb: 2,
              }}
            >
              <Grid container spacing={2} >
                <Grid item xs={5} >
                  <Image
                    src="http://res.cloudinary.com/dpfhjk0sw/image/upload/v1686278445/dish/ks9irpqtxzrxoxd3c6ni.avif"
                    alt="Picture of the author"
                    width={200}
                    height={200}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </ContentBox>
    </Layout>
  );
};

export default DetalleComanda;
