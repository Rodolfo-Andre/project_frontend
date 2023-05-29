import { ButtonAdd, ContentBox, Layout, LoadingBackdrop } from "@/components";
import { ComandDetail } from "@/components/Comands/ComandDetail";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { deleteCommand } from "@/services/apis/comands-services";
import { AxiosError } from "axios";
import CommandModal from "@/components/Comands/CommandModal";
import Swal from "sweetalert2";

import { ITableGetCommand } from "@/interfaces";
import useFectch from "@/hooks/useFetch";
import { ICommandGet } from "@/interfaces/ICommand/ICommand";
import { AlignVerticalCenterSharp } from "@mui/icons-material";
import { AlertMessage } from "@/utils";

const styles = {
  colums: {
    enabled: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
      backgroundColor: "#28A745",
      borderRadius: "10px",

      minWidth: "150px",
      minHeight: "150px",
      cursor: "pointer",
    },
    disabled: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
      backgroundColor: "#DC3545",
      borderRadius: "10px",
      minWidth: "150px",
      minHeight: "150px",
      cursor: "pointer",
    },
    text: {
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
  },
};

const CommandsPage = () => {
  const { data, error, loading } = useFectch<ICommandGet[]>(
    "api/Command",
    "get"
  );
  const [selectData, setSelectData] = useState<null | ICommandGet>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  const handleOpen = () => setOpen(true);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const elimando = await deleteCommand(id);

          Swal.fire(
            "Eliminado",
            "La comanda ha sido eliminada correctamente",
            "success"
          ).then(() => {
            window.location.reload();
          });
        } catch (error) {
          const errores = error as AxiosError;
          const mensaje = errores.response?.data as string;
          if (errores.response) {
            Swal.fire("Error", mensaje, "error");
          } else {
            Swal.fire("Error", "Ha ocurrido un error", "error");
          }
        }
      }
    });
  };

  const handleEdit = (id: number) => {
    setIsEdit(true);
    const commanda = data?.find((d) => d.id == id);
    if (commanda) {
      console.log(commanda);

      // setSelectData(commanda);
      handleOpen();
    } else {
      AlertMessage("Error", "no se encontro la comanda", "error");
    }
  };

  const handleSelect = (id: number) => {
    const commanda = data?.find((d) => d.id == id);
    if (commanda) {
      setSelectData(commanda);
    } else {
      AlertMessage("Error", "no se encontro la comanda", "error");
    }
  };

  return (
    <div>
      <Layout>
        <ContentBox
          sxProps={{
            padding: 2,
          }}
        >
          <Typography
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "#637381",
            }}
            variant="h5"
          >
            Comandas
          </Typography>
          <ButtonAdd text="Añadir Comanda" openDialog={handleOpen} />

          <Grid
            sx={{
              mt: 2,
              mb: 3,
            }}
            border={1}
            container
          >
            <Grid item key={Date.now()} xs={12} md={8} sx={{ p: 2 }}>
              <Grid container gap={2}>
                {data || loading ? (
                  <>
                    {data?.map((d, id) => {
                      const style =
                        d.tableRestaurant.stateTable == "Ocupado"
                          ? styles.colums.disabled
                          : styles.colums.enabled;
                      return (
                        <Grid
                          key={Date.now() + id}
                          sx={style}
                          item
                          lg={3}
                          md={4}
                          xs={12}
                          onClick={() => handleSelect(d.id)}
                        >
                          <Typography sx={styles.colums.text} variant="h6">
                            Id: {d.id}
                            <br />
                            {d.tableRestaurant.stateTable}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#637381",
                      textAlign: "center",
                      my: 2,
                    }}
                    variant="h6"
                  >
                    Cargando...
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              key={Date.now() + 1}
              sx={{
                p: 2,
                "@media (max-width: 800px)": {
                  padding: "10px",
                },
              }}
              borderLeft={1}
              xs={12}
              md={4}
            >
              {selectData ? (
                <ComandDetail
                  dataCommand={selectData}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#637381",
                    textAlign: "center",
                    my: 2,
                  }}
                  variant="h6"
                >
                  Selecciona una comanda
                </Typography>
              )}
            </Grid>
          </Grid>
        </ContentBox>
        {open && (
          <CommandModal
            isEdit={isEdit}
            handleClose={handleClose}
            open={open}
            handleOpen={handleOpen}
            dataCommand={selectData}
          />
        )}
      </Layout>
    </div>
  );
};

export default CommandsPage;
