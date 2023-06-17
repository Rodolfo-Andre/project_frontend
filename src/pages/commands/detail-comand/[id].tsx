import ContentBox from "@/components/ContentBox";
import Layout from "@/components/Layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React, { useEffect, useContext, useState } from "react";
import {InputForm} from "@/components/InputForm";
import { ICategoryDishGet, IDishGet, ITableWithComand2 } from "@/interfaces";
import useFectch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import LoaderCustom from "@/components/Loader";
import { AlertMessage } from "@/utils";
import { AuthContext } from "@/contexts";
import CardCommandComponent from "@/components/Command/CardCommand";
import CommandServices from "@/services/apis/command-services";
import ServiceDish from "@/services/apis/dish-services";
const style = {
  titulo: {
    m: 4,
    fontWeight: "bold",
    color: "#637381",
  },
  containerForm: {
    
  },
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 4,
  },
  containerModal: {
    display: "grid",
    gridGap: "10px",
  },
  boxModal: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "4px",
  },
};

interface IStateDish {
  listDish: IDishGet[];
  listCategory: ICategoryDishGet[];
  selectDish: IDishView | null;
  listDishViewAndPost: IDishView[];
  selectedCategory: string | null;
  valSelectCategory: string;
  valSelectDish: string;
}

interface IDishView extends IDishGet {
  quantity: number;
  observation: string;
  total: number;
}

const DetalleComanda = () => {
  const router = useRouter();
  const queryValue = router.query["id"] || router.asPath.match(new RegExp(`[&?]${"id"}=(.*)(&|$)`))
  console.log(queryValue);

  const { user } = useContext(AuthContext);
  const [stateLoading, setStateLoading] = useState(false)
  const [stateDish, setstateDish] = useState<IStateDish>({
    listDish: [],
    listCategory: [],
    selectedCategory: null,
    valSelectCategory: "",
    valSelectDish: "",
    selectDish: null,
    listDishViewAndPost: [],
  });
  const [stateError, setStateError] = useState({
    quantity: { error: false, message: "" },
    cantPerson: { error: false, message: "" },
  });
  const [open, setOpen] = useState(false);
  const [cantPerson, setCantPerson] = useState(0);
  const [valuesDish, setValuesDish] = useState({
    quantity: 0,
    observation: "",
  });

  const { data,   loading, isError } = useFectch<ITableWithComand2>(
    "api/command/getCommandByTableId/" + queryValue,
    "get"
  );

  useEffect(() => {
    const { getCategoryDish } = ServiceDish;
     
    setStateLoading(true)
    const getIntialData = async () => {
      try {
        const data = await getCategoryDish();

        setstateDish((prev) => ({
          ...prev,
          listCategory: data,
        }));
      } catch (error) {
        console.log(error);

        AlertMessage(
          "Error!",
          "No se pudo cargar las categorias",
          "error"
        ).then(() => {});
      }finally{
        setStateLoading(false)
      }
    };

    if (data) {
      setCantPerson(data.cantSeats);
      const listado = data.detailsComand.map((item) => {
        return {
          categoryDish: {
            id: item.dish.categoryDishId,
            nameCatDish: item.dish.categoryDishName,
          },
          id: item.dish.id,
          imgDish: item.dish.imgDish,
          nameDish: item.dish.nameDish,
          observation: item.observation,
          priceDish: item.dish.priceDish,
          quantity: item.cantDish,
          total: item.dish.priceDish * item.cantDish,
        } as IDishView;
      });
      setstateDish((prev) => ({
        ...prev,
        listDishViewAndPost: listado,
      }));
    }

    getIntialData();
  }, [data]);

  useEffect(() => {
    const { getDishes } = ServiceDish;
    const getIntialData = async () => {
      try {
        if (stateDish.selectedCategory === null) return;

        const data = await getDishes(stateDish.selectedCategory);
        setstateDish((prev) => ({
          ...prev,
          listDish: data,
        }));
      } catch (error) {
        AlertMessage("Error!", "No se pudo cargar los platos", "error").then(
          () => {}
        );
      }
    };
    getIntialData();
  }, [stateDish.selectedCategory]);

 

  const ramdonKey = (name: string) => {
    return Math.random()
      .toString(36)
      .replace("0.", name || "");
  };

  if (loading ) {
    return <LoaderCustom />;
  }

  if (isError && !loading) {
    AlertMessage("Error!", "No se pudo cargar la comanda", "error").then(() => {
      window.location.href = "/commands";
    });
    return <LoaderCustom />;
  }

  const handleAddDish = () => {
    if (stateDish.valSelectDish === "") return;

    const validQuantity = valuesDish.quantity > 0;

    if (!validQuantity) {
      setStateError((prev) => ({
        ...prev,
        quantity: { error: true, message: "La cantidad debe ser mayor a 0" },
      }));
      return;
    }

    setStateError((prev) => ({
      ...prev,
      quantity: { error: false, message: "" },
    }));

    const dish = stateDish.listDish.find(
      (x) => x.id === stateDish.valSelectDish
    );

    if (dish) {
      const exist = stateDish.listDishViewAndPost.find(
        (x) => x.id === stateDish.valSelectDish
      );
      //if exist add quantity and total
      if (exist) {
        setstateDish((prev) => ({
          ...prev,
          listDishViewAndPost: prev.listDishViewAndPost.map((x) =>
            x.id === stateDish.valSelectDish
              ? {
                  ...x,
                  quantity: x.quantity + Math.round(valuesDish.quantity),
                  total:
                    x.total + Math.round(valuesDish.quantity) * dish.priceDish,
                }
              : x
          ),
        }));
      } else {
        setstateDish((prev) => ({
          ...prev,
          listDishViewAndPost: [
            ...prev.listDishViewAndPost,
            {
              ...dish,
              quantity: Math.round(valuesDish.quantity),
              observation: valuesDish.observation,
              total: Math.round(valuesDish.quantity) * dish.priceDish,
            },
          ],
        }));
      }
    }

    setstateDish((prev) => ({
      ...prev,
      valSelectDish: "",
    }));

    setValuesDish({
      ...valuesDish,
      quantity: 0,
      observation: "",
    });
  };

  const handleDeleteDish = (id: string) => {
    const dish = stateDish.listDishViewAndPost.find((x) => x.id === id);

    if (dish) {
      setstateDish((prev) => ({
        ...prev,
        listDishViewAndPost: prev.listDishViewAndPost.filter(
          (x) => x.id !== id
        ),
      }));
    }
  };

  const saveCommand = async () => {

    const validCantPerson = cantPerson > 0;
    const validateListDish = stateDish.listDishViewAndPost.length > 0;

    if (!validateListDish) {
      AlertMessage(
        "Error!",
        "Debe agregar al menos un plato a la comanda",
        "error"
      ).then(() => {});
      return;
    }

    if (!validCantPerson) {
      setStateError((prev) => ({
        ...prev,
        cantPerson: { error: true, message: "La cantidad debe ser mayor a 0" },
      }));
      return;
    }

    setStateError((prev) => ({
      ...prev,
      cantPerson: { error: false, message: "" },
    }));

    const listDishPost = stateDish.listDishViewAndPost.map((x) => {
      return {
        dishId: x.id,
        quantity: x.quantity,
        observation: x.observation,
      };
    });
    const objectPost = {
      id: data?.id,
      numTable: data?.numTable,
      cantPerson: cantPerson,
      employeeId: user?.id,
      total: total,
      listDish: listDishPost,
    };
    
    setStateLoading(true);
    try {
      const data = await CommandServices.saveCommand(objectPost);

      if (data) {
        AlertMessage("Exito!", "Se guardo la comanda", "success").then(() => {
          window.location.href = "/commands";
        });
      }
    } catch (error) {
      AlertMessage("Error!", "No se pudo guardar la comanda", "error").then(
        () => {}
      );
    }finally{
      setStateLoading(false);
    }
  };

  const deleteCommand = async () => {
    if (!data) {
      return;
    }

    setStateLoading(true);

    try {
      const mesage = await CommandServices.deleteCommand(data.id);
      console.log(mesage);

      AlertMessage("Exito!", "Se elimino la comanda", "success").then(() => {
        window.location.href = "/commands";
      });
    } catch (error) {
      AlertMessage("Error!", "No se pudo eliminar la comanda", "error").then(
        () => {}
      );
    }finally{
      setStateLoading(false);
    }
  };
  const total = stateDish.listDishViewAndPost.reduce((a, b) => a + b.total, 0);

  return (
    <Layout>
      <ContentBox>
        <Typography sx={style.titulo} variant="h4">
          Detalle de la comanda
        </Typography>

        {!data ? (
          <>
            <Typography sx={style.titulo} variant="h4">
              No se pudo cargar la comanda
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.location.href = "/commands";
              }}
            >
              Volver
            </Button>
          </>
        ) : (
          <Grid 
          container sx={style.containerForm}>
            <Grid 
            item xs={12} md={6} 
              sx={{
                height: "100%",
                padding: 2,
              }}
            >
              {data.id !== 0 && (
                <InputForm
                  Icon={<Grid3x3OutlinedIcon color="primary" />}
                  id="id-commmand"
                  label="Id de la comanda"
                  value={data.id}
                  disabled={true}
                  type="number"
                  onChange={() => {}}
                  isErrored={false}
                  errorText=""
                />
              )}

              <InputForm
                Icon={<TableRestaurantIcon color="primary" />}
                id="number-table"
                label="Numero de mesa"
                value={data.numTable}
                disabled={true}
                type="number"
                onChange={() => {}}
                isErrored={false}
                errorText=""
              />

              <InputForm
                Icon={<PeopleAltIcon color="primary" />}
                id="cant-personas"
                label="Cantidad de personas"
                type="number"
                value={cantPerson}
                onChange={(ev) => {
                  setCantPerson(Number(ev.target.value));
                }}
                isErrored={false}
                errorText=""
              />

              <InputForm
                Icon={<SmartScreenIcon color="primary" />}
                id="state-commmand"
                label="Estado de la comanda"
                disabled={true}
                value={data.statesCommandName}
                type="string"
                onChange={() => {}}
                isErrored={false}
                errorText=""
              />

              <InputForm
                Icon={<AssignmentIndIcon color="primary" />}
                id="employee-commmand"
                label="Empleado"
                value={user?.firstName + " " + user?.lastName}
                disabled={true}
                type="string"
                onChange={() => {}}
                isErrored={false}
                errorText=""
              />

              <InputForm
                Icon={<PriceChangeIcon color="primary" />}
                id="total-commmand"
                label="Total"
                value={total}
                disabled={true}
                type="number"
                onChange={() => {}}
                isErrored={false}
                errorText=""
              />

              <Grid sx={{ marginTop: 2 }} width={"100%"} container gap={1}>
                <Grid item xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      alert("GARY CABRO");
                    }}
                    fullWidth
                    sx={{ bgcolor: "#6f42c1" }}
                  >
                    Facturar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={saveCommand}
                    disabled={stateLoading}
                    fullWidth
                  >
                    {data.id ? "Actualizar" : "Guardar"}
                  </Button>
                </Grid>

                    {
                      data.id !== 0 && (
                        <Grid item xs={12} sm={12} md={3}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={deleteCommand}
                          disabled={stateLoading}
                          fullWidth
                        >
                          Eliminar
                        </Button>
                      </Grid>
                      )
                    }

                <Grid item xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      window.location.href = "/commands";
                    }}
                  >
                    Volver
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid 
            item xs={12} md={6}
            sx={{  height: "100%", padding: 2 ,
            borderLeft: "1px solid #E0E0E0",
             }}>
              <FormControl sx={{ marginBottom: 2 }} fullWidth>
                <InputLabel id="lbl-category">Categoria</InputLabel>
                <Select
                  labelId="lbl-category"
                  id="id-category"
                  value={stateDish.valSelectCategory}
                  label="Categoria"
                  disabled={stateLoading}
                  onChange={(e) => {
                    setstateDish((prev) => ({
                      ...prev,
                      valSelectCategory: e.target.value,
                      selectedCategory: e.target.value,
                      valSelectDish: "",
                    }));
                  }}
                >
                  {stateDish.listCategory.map((item, index) => (
                    <MenuItem key={ramdonKey("catDish")} value={item.id}>
                      {item.nameCatDish}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ marginBottom: 2 }} fullWidth>
                <InputLabel id="lbl-dish">Platos</InputLabel>
                <Select
                  labelId="lbl-dish"
                  id="id-dish"
                  value={stateDish.valSelectDish}
                  label="Platos"
                  disabled={stateDish.valSelectDish === null}
                  onChange={(e) => {
                    setstateDish((prev) => ({
                      ...prev,
                      valSelectDish: e.target.value,
                    }));
                  }}
                >
                  {stateDish.listDish.map((item, index) => (
                    <MenuItem key={ramdonKey("dish")} value={item.id}>
                      {item.nameDish}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <InputForm
                Icon={<ProductionQuantityLimitsIcon color="primary" />}
                id="quantity-dish"
                label="Cantidad"
                value={valuesDish.quantity}
                type="number"
                onChange={(event) => {
                  setValuesDish((prev) => ({
                    ...prev,
                    quantity: Number(event.target.value),
                  }));
                }}
                isErrored={stateError.quantity.error}
                errorText={stateError.quantity.message}
              />

              <InputForm
                Icon={<ChromeReaderModeIcon color="primary" />}
                id="observation-dish"
                label="Observacion"
                value={valuesDish.observation}
                type="string"
                onChange={(event) => {
                  if (event.target.value.length <= 50) {
                    setValuesDish((prev) => ({
                      ...prev,
                      observation: event.target.value,
                    }));
                  }
                }}
                isErrored={false}
                errorText=""
              />

              <Button
                fullWidth
                disabled={stateLoading}
                variant="contained"
                color="primary"
                onClick={handleAddDish}
              >
                Agregar
              </Button>

              <Box
                sx={{
                  marginTop: 2,
                  padding: 1,
                  background: "#F5F5F5",
                  borderRadius: 5,
                  overflowY: "auto",
                  height: "300px",
                }}
              >
                {stateDish.listDishViewAndPost.map((item, index) => (
                  <CardCommandComponent
                    key={ramdonKey("card-dish")}
                    data={item}
                    handleRemove={handleDeleteDish}
                    showModal={() => {
                      setOpen(!open);
                      setstateDish((prev) => ({
                        ...prev,
                        selectDish: item,
                      }));
                    }}
                  />
                ))}
                {stateDish.selectDish !== null && (
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal"
                    aria-describedby="modal-description"
                  >
                    <Box sx={style.modal}>
                      <Typography variant="h5" 
                      color={"primary"}
                      sx={{ marginBottom: 2,textAlign: 'center' }}>
                       {stateDish.selectDish.nameDish}
                      </Typography>

                      <Box sx={style.containerModal}>

                        <InputForm
                          errorText=""
                          Icon={<FastfoodIcon color="primary" />}
                          id="desc-name-dish"
                          label="Nombre"
                          value={stateDish.selectDish.nameDish}
                          type="string"
                          onChange={(event) => {}}
                          isErrored={false}
                          disabled={true}
                          />

                        <InputForm
                          errorText=""
                          Icon={"S/."}
                          id="desc-price-dish"
                          label="Precio"
                          value={stateDish.selectDish.priceDish}
                          type="number"
                          onChange={(event) => {}}
                          isErrored={false}
                          disabled={true}
                          />


                        <InputForm
                          errorText=""
                          Icon={<ProductionQuantityLimitsIcon color="primary" />}
                          id="desc-quantity-dish"
                          label="Cantidad"
                          value={stateDish.selectDish.quantity}
                          type="number"
                          onChange={(event) => {}}
                          isErrored={false}
                          disabled={true}
                          />


                        <InputForm
                          errorText=""
                          Icon={<ChromeReaderModeIcon color="primary" />}
                          id="desc-observation-dish"
                          label="Observacion"
                          value={stateDish.selectDish.observation}
                          type="string"
                          onChange={(event) => {}}
                          isErrored={false}
                          disabled={true}
                          />

                      </Box>
                    </Box>
                  </Modal>
                )}
              </Box>
            </Grid> 
          </Grid>
        )}
      </ContentBox>
    </Layout>
  );
};

export default DetalleComanda;
