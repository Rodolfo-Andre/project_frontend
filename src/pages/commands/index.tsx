import { ContentBox, Layout } from "@/components";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PriceChangeIcon from "@mui/icons-material/PriceChange"; 
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import useFectch from "@/hooks/useFetch";
import { Box } from "@mui/material"; 
import { ITableWithComand } from "@/interfaces";

const styles = {
  titulo: {
    mb: 4,
    fontWeight: "bold",
    color: "#637381",
  },
  borderContainer: {
    border: "1px solid #E0E0E0",
    borderRadius: "0.5rem",
    padding: 4,
    mb: 2,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    padding: 20,
  },
  card: {
    borderRadius: "0.5rem",
    padding: 4,
    mb: 2,
    width: "250px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "20px",
    cursor: "pointer",
  },
  cardSuccess: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      backgroundColor: "#388E3C",
      transition: "0.5s ease",
    },
    "&:active": {
      backgroundColor: "#1B5E20",
    },
  },
  cardDanger: {
    backgroundColor: "#F44336",
    "&:hover": {
      backgroundColor: "#D32F2F",
      transition: "0.5s ease",
    },
    "&:active": {
      backgroundColor: "#B71C1C",
    },
  },
  boderRight: {
    borderRight: "1px solid #E0E0E0",
  },
};

const dataFake = [
  {
    id: 1,
    mesa: 1,
    estado: "Ocupada",
    fecha: "2021-10-10",
    price: 100,
  },
  {
    id: 2,
    mesa: 2,
    estado: "Libre",
    fecha: "2021-10-10",
    price: 100,
  },
];

const CommandsPage = () => {
  const { data, error, loading } = useFectch<ITableWithComand[]>(
    "api/table/tableComands",
    "get"
  );

  const [selectData, setSelectData] = useState<ITableWithComand | null>(null);


  const calcularPrice = (table: ITableWithComand) => {
    if (table.commands.length == 0) {
      return 0;
    }
    return table.commands.reduce((a, b) => a + b.precTotOrder, 0);
  };

  const ramdonKey = (name: string) => {
    return Math.random()
      .toString(36)
      .replace("0.", name || "");
  };

  return (
    <div>
      <Layout>
        <ContentBox sxProps={{ p: 2 }}>
          <Typography sx={styles.titulo} variant="h6">
            Comandas
          </Typography>
          <Grid style={styles.borderContainer} container>
            <Grid sx={styles.boderRight} item xs={12} >
              <Box style={styles.grid}>
                {data && error == null && !loading ? (
                  <>
                    {data.length > 0 ? (
                      data.map((d) => (
                        <Box
                          sx={{
                            ...styles.card,
                            ...(d.stateTable == "Ocupado"
                              ? styles.cardDanger
                              : styles.cardSuccess),
                          }}
                          key={ramdonKey("item")}
                          onClick={() => setSelectData(d)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#fff",
                              gap: 1,
                            }}
                          >
                            <TableRestaurantIcon fontSize="large" />
                            <Typography variant="h6"> {d.numTable}</Typography>
                          </Box>

                          <Box
                            sx={{
                              color: "#fff",
                              gap: 1,
                              my: 2,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {d.stateTable == "Ocupado" ? (
                              <AccessTimeFilledOutlinedIcon fontSize="large" />
                            ) : (
                              <CheckCircleIcon fontSize="large" />
                            )}
                            <Typography variant="h6">{d.stateTable}</Typography>
                          </Box>

                          {/* <Box
                            sx={{
                              color: "#fff",
                              gap: 1,
                              mb: 2,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CalendarMonthIcon fontSize="large" />
                            <Typography variant="h6">{d.}</Typography>
                          </Box> */}

                          {d.stateTable == "Ocupado" && (
                            <Box
                              sx={{
                                color: "#fff",
                                gap: 1,
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <PriceChangeIcon fontSize="large" />
                              <Typography variant="h6">
                                {calcularPrice(d)}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body1">No hay comandas</Typography>
                    )}
                  </>
                ) : (
                  <h1>Cargando</h1>
                )}
              </Box>
            </Grid>
            {/* <Grid
              item
              xs={12}
              md={4}
              sx={{
                padding: 4,
              }}
            >
              {selectData ? (
                <ComandDetail table={selectData} />
              ) : (
                <Typography variant="body1">
                  Seleccione una Mesa para ver su detalle.
                </Typography>
              )}
            </Grid> */}
          </Grid>
        </ContentBox>
      </Layout>
    </div>
  );
};

export default CommandsPage;
