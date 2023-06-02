import { ICategoryDishGet } from "@/interfaces/ICategoryDish";
import { IDishGet } from "@/interfaces/IDish";
import {
  ICreateCommand,
  createCommand,
  getCategoryDishes,
  getDishesByCategory,
  updateCommand,
} from "@/services/apis/comands-services";
import { handleError } from "@/utils";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Yup } from "@/schemas";
import { AuthContext } from "@/contexts/Auth";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { CircularProgress } from "@mui/material";
import { ICommandGet } from "@/interfaces/ICommand/ICommand";

interface IDish {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  observation: string;
}
interface ICommandModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  isEdit: boolean;
  dataCommand: ICommandGet | null;
}

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    width: "900px", // Ancho 100%
    height: "700px", // Alto 100%
    backgroundColor: "#fff",
    overflow: "scroll",
    overflowX: "hidden",
    //custom scroll
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#FFFFFF",
    },

    //media query
    "@media (max-width: 800px)": {
      width: "400px",
      height: "400px",
    },
  },
};
const validationSchema = Yup.object().shape({
  numeroMesa: Yup.number()
    .required("El numero de mesa es requerido")
    .min(1, "El numero de mesa debe ser mayor a 0"),
  cantidadClientes: Yup.string().required("El numero de clientes es requerido"),
});
const CommandModal: FC<ICommandModalProps> = ({
  handleClose,
  open,
  isEdit,
  dataCommand,
}) => {
  const [dataTable, setDataTable] = useState<ICommandGet | null>(dataCommand);
  console.log(dataTable);

  const [loading, setLoading] = useState(false);
  const [listDish, setListDish] = useState<IDish[]>([]);
  const [dishOptions, setDishOptions] = useState<IDishGet[]>([]);
  const { user } = useContext(AuthContext);
  const [categoryDish, setCategoryDish] = useState<ICategoryDishGet[]>([]);
  const [objDish, setObjDish] = useState<IDish>({
    id: "",
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    observation: "",
  });

  const formik = useFormik({
    initialValues: {
      numeroMesa: 0,
      cantidadClientes: 0,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      if (listDish.length === 0) {
        return;
      }

      formik.resetForm();
      setLoading(true);
      try {
        const lista = listDish.map((d) => {
          return {
            dishId: d.id,
            cantDish: d.quantity,
            observation: d.observation,
          };
        });

        const data: ICreateCommand = {
          cantSeats: values.cantidadClientes,
          tableRestaurantId: values.numeroMesa,
          listDetails: lista,
        };

        if (isEdit) {
          if (dataTable?.id == null || dataTable?.id == undefined) {
            return;
          }
          console.log(dataTable?.id);

          await updateCommand(data, dataTable?.id);
          window.location.reload();
          return;
        }
        await createCommand(data);
        window.location.reload();
      } catch (error) {
        const errores = error as AxiosError;
        handleError(errores);
      } finally {
        setListDish([]);
        formik.resetForm();
        handleClose();
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    const getDishes = async () => {
      try {
        const data = await getCategoryDishes();

        if (isEdit == true) {
          formik.setFieldValue(
            "numeroMesa",
            dataTable?.tableRestaurant.numTable
          );
          formik.setFieldValue(
            "cantidadClientes",
            dataTable?.tableRestaurant.numSeats
          );

          if (dataTable != undefined) {
            const lista = dataTable?.detailsComand.map((d) => {
              return {
                id: d.dish.id,
                name: d.dish.nameDish,
                category: d.dish.categoryDish.nameCatDish,
                quantity: d.cantDish,
                price: d.dish.priceDish,
                observation: d.observation,
              };
            });
            setListDish(lista);
          }
        }

        setCategoryDish(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getDishes();

    return () => {
      setListDish([]);
      setObjDish({
        id: "",
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        observation: "",
      });
      setDishOptions([]);
      setCategoryDish([]);
    };
  }, []);

  useEffect(() => {
    if (objDish.category != "") {
      const getDishes = async () => {
        try {
          const data = await getDishesByCategory(objDish.category);
          setDishOptions(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getDishes();
    }

    return () => {
      setDishOptions([]);
    };
  }, [objDish.category]);

  const handleSelect = (event: any, value: IDishGet | null) => {
    event.preventDefault();
    if (value == null) return;

    setObjDish({
      ...objDish,
      name: value.nameDish,
      id: value.id,
      price: value.priceDish,
    });
  };

  const hasAllErrors = (formik: any) => {
    const errors = formik.errors;
    const keys = Object.keys(errors);
    const hasErrors = keys.length > 0;

    return hasErrors;
  };

  const isEmptyorNullObjDish = () => {
    return (
      objDish?.category === "" ||
      objDish?.name === "" ||
      objDish?.quantity === 0 ||
      objDish == null
    );
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      editable: false,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 250,
      editable: false,
      sortable: false,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton
            color="error"
            onClick={() => {
              const id = params.row.id as string;
              const newList = listDish.filter((d) => d.id !== id);
              setListDish(newList);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  const handleAddDish = () => {
    if (isEmptyorNullObjDish()) return;
    if (objDish == null) {
      return;
    }
    if (objDish.id === "" || objDish.id == null) {
      return;
    }
    const exist = listDish.find((d) => d.id === objDish.id);
    if (exist) {
      objDish.quantity = objDish.quantity + exist.quantity;

      const newList = listDish.filter((d) => d.id !== objDish.id);
      setListDish([...newList, objDish]);
      setObjDish({
        id: "",
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        observation: "",
      });
      setDishOptions([]);
      return;
    }

    setListDish([...listDish, objDish]);

    setObjDish({
      id: "",
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      observation: "",
    });
    setDishOptions([]);

    return;
  };

  const total = listDish.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <Modal
      open={open}
      closeAfterTransition
      keepMounted
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={styles.modal}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <div></div>

                {hasAllErrors(formik) && (
                  <Alert severity="error">
                    {
                      formik.errors[
                        Object.keys(
                          formik.errors
                        )[0] as keyof typeof formik.errors
                      ]
                    }
                  </Alert>
                )}

                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon color="error" />
                </IconButton>
              </Box>
              <Grid marginTop={1} container>
                <Grid
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  item
                  borderBottom={1}
                  xs={12}
                  md={6}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#637381",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {isEdit ? "Editar Comanda" : "Crear Comanda"}
                  </Typography>
                  <TextField
                    id="idComanda"
                    label="Id de Comanda"
                    variant="outlined"
                    value={dataCommand?.id ?? ""}
                    sx={{ display: isEdit ? "block" : "none" }}
                    margin="normal"
                  />
                  <TextField
                    id="numeroMesa"
                    label="Numero de Mesa"
                    variant="outlined"
                    type="number"
                    value={formik.values.numeroMesa}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    margin="normal"
                  />
                  <TextField
                    margin="normal"
                    id="cantidadClientes"
                    label="Cantidad de Clientes(Maximo 4)"
                    variant="outlined"
                    type="number"
                    value={formik.values.cantidadClientes}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    id="estadoComanda"
                    label="Estado de la Comanda"
                    variant="outlined"
                    value={dataTable?.statesCommand.state ?? "Disponible"}
                    disabled
                  />

                  <TextField
                    id="empleado"
                    label="Empleado"
                    variant="outlined"
                    value={
                      dataTable?.employee
                        ? dataTable?.employee.firstName +
                          " " +
                          dataTable?.employee.lastName
                        : user?.firstName + " " + user?.lastName
                    }
                    disabled
                    margin="normal"
                  />
                  <TextField
                    margin="normal"
                    id="precioTotal"
                    label="Precio Total"
                    variant="outlined"
                    type="number"
                    disabled
                    value={total}
                  />
                </Grid>
                <Grid
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  item
                  borderLeft={1}
                  borderBottom={1}
                  xs={12}
                  md={6}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#637381",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    Agregar Plato
                  </Typography>

                  <FormControl margin="normal">
                    <InputLabel id="plato-categoria">Categoria</InputLabel>
                    <Select
                      id="demo-simple-select"
                      labelId="plato-categoria"
                      value={objDish?.category || ""}
                      label="Categoria"
                      onChange={(e) => {
                        setObjDish({
                          ...objDish,
                          category: e.target.value as string,
                        });
                      }}
                    >
                      {categoryDish.map((item) => (
                        <MenuItem key={Date.now() + item.id} value={item.id}>
                          {item.nameCatDish}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl margin="normal">
                    <Autocomplete
                      options={dishOptions}
                      key={objDish?.category || ""}
                      getOptionLabel={(option) => option.nameDish}
                      isOptionEqualToValue={(
                        option: IDishGet,
                        value: IDishGet
                      ) => {
                        return value && option.id === value.id;
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Selecciona un platillo" />
                      )}
                      onChange={handleSelect}
                    />
                  </FormControl>
                  <FormControl margin="normal">
                    <TextField
                      id="outlined-basic"
                      label="Cantidad de Platos"
                      variant="outlined"
                      value={objDish?.quantity || 0}
                      type="number"
                      onChange={(e) =>
                        setObjDish({
                          ...objDish,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </FormControl>

                  <FormControl margin="normal">
                    <TextField
                      id="outlined-basic"
                      label="Observaciones"
                      variant="outlined"
                      value={objDish.observation}
                      type="text"
                      onChange={(e) =>
                        setObjDish({
                          ...objDish,
                          observation: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isEmptyorNullObjDish()}
                    sx={{ mt: 1, mb: 12 }}
                    color="primary"
                    onClick={handleAddDish}
                  >
                    Agregar
                  </Button>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: "auto" }}
                    disabled={!formik.isValid || loading}
                    color="primary"
                  >
                    Generar Comanda <AddIcon sx={{ mx: 1 }} />
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: "auto" }}
                    onClick={() => console.log("hola")}
                    color="secondary"
                    disabled={dataTable?.statesCommand.state == "Paid"}
                  >
                    Facturar Comanda <FactCheckIcon sx={{ mx: 1 }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box pb={2}>
              <DataGrid
                columns={columns}
                rows={listDish}
                getRowId={(row) => row.id.toString() + Date.now().toString()}
                hideFooterPagination
                hideFooterSelectedRowCount
                rowSelection={false}
                autoHeight
                hideFooter
                scrollbarSize={1}
                sx={{
                  height: "300px",
                }}
              />
            </Box>
          </Box>
        )}
      </Fade>
    </Modal>
  );
};

export default CommandModal;
