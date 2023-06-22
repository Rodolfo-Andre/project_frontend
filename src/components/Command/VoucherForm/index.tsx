 
import { Box, Modal, Typography, Grid, Chip, Button } from "@mui/material";
import { CommandContext } from "@/contexts/Command";
import BadgeIcon from "@mui/icons-material/Badge";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { InputForm } from "@/components/InputForm";
import SelectCustom from "@/components/Select";
import { useState, useEffect,useContext,useReducer } from "react";
import { ICashGet, IPayMethodGet, IVoucherTypeGet } from "@/interfaces";
import axiosObject from "@/services/Axios";
import CardInfoOrder from "../CardInfoOrder";
import { AlertMessage, ramdonKey } from "@/utils";
import { AuthContext } from "@/contexts";
 

const styleModalVocher = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1300,
    height: 700,
    bgcolor: "background.paper",
    borderRadius: "0.5rem",
    overflow: "auto",
    boxShadow: 24,
    p: 4,
    "@media (max-width: 1100px)": {
      width: 700,
      height: 700,
    },
  },
};

interface IObjsList {
  listPaymentType: IPayMethodGet[];
  listTypeVoucher: IVoucherTypeGet[];
  listCash: ICashGet[];
}

interface IStateClient {
  name: string;
  lastName: string;
  dni: string;
  valueTypeVoucher: string;
  valuePaymentType: string;
  valueCash: string;
}

interface IActionClient {
  type: "SET_NAME" | "SET_LAST_NAME" | "SET_DNI" | "SET_VALUE_TYPE_VOUCHER" | "SET_VALUE_PAYMENT_TYPE" | "SET_VALUE_CASH";
  payload: string;
}
type IlistTypeCash ={
  id: number;
  amount: number;
  typePayment: string;
  name: string;
}



const reducerClient = (state:IStateClient, action:IActionClient) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_DNI":
      return { ...state, dni: action.payload };

    case "SET_VALUE_TYPE_VOUCHER":
      return { ...state, valueTypeVoucher: action.payload };
    case "SET_VALUE_PAYMENT_TYPE":
      return { ...state, valuePaymentType: action.payload };


    case "SET_VALUE_CASH":
      return { ...state, valueCash: action.payload };
    
    default:
      return state;
  }
}


const FormVoucher = () => {

  const{user} = useContext(AuthContext);

  const { state, data, dispatch } = useContext(CommandContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [faltante, setFaltante] = useState(0);
  const [listPaymen, setListPaymen] = useState<IlistTypeCash[]>([])

   ///reducer cliente
    const [stateClient, dispatchClient] = useReducer(reducerClient, {
      name: "",
      lastName: "",
      dni: "",
      valueTypeVoucher: "",
      valuePaymentType: "",
      valueCash: "",
    });


  const [objsList, setObjsList] = useState<IObjsList>({
    listPaymentType: [],
    listTypeVoucher: [],
    listCash : [],
  });
  const [habilitar, setHabilitar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dni, setDni] = useState("");
  const [valueAmount, setValueAmount] = useState(0);
  const [discounState, setDiscounState] = useState(0)

  useEffect(() => {
    const loadList = async () => {
      try {
        const { data: getListPaymentType } = await axiosObject.get<
          IPayMethodGet[]
        >("/api/paymethod");
        const { data: getListTypeVoucher } = await axiosObject.get<
          IVoucherTypeGet[]
        >("/api/voucherType");

        const { data: getListCash } = await axiosObject.get<
        ICashGet[]
      >("/api/cash");

        setObjsList({
          listPaymentType: getListPaymentType,
          listTypeVoucher: getListTypeVoucher,
          listCash: getListCash,
        });

        calcularTotal();
 
      } catch (error) {
        console.log(error);
      }
    };
    loadList();
  }, []);




  const calcularTotal = () => {
    const totallist = state.data.listDishViewAndPost.reduce(
      (acc, item) => acc + item.total,
      0
    );       
    setSubTotal(totallist);
    
    const igv = totallist * 0.18;
    setIgv(igv);
    const totalFinal = totallist + igv;
    setTotalFinal(totalFinal);
    setFaltante(totalFinal);
  };


  const addListPaymen = () => {
    const valuePaymentTypea = stateClient.valuePaymentType;
    if(stateClient.valuePaymentType === "") {
      return;
    }

    if(valueAmount === 0){
      return;
    }

    const exist = listPaymen.find(item => item.typePayment === valuePaymentTypea);
    if(exist){
      return;
    }

    if(valueAmount > faltante ){
      return;
    }


    if(valueAmount > 0){
      const payment = objsList.listPaymentType.find(item => item.id === stateClient.valuePaymentType);
      if (payment) {
       
      const newObjs: IlistTypeCash = {
        id :  Number(payment.id),
       amount: valueAmount,
       typePayment: payment.id,
       name: payment.paymethod,
        } 
        setListPaymen([...listPaymen, newObjs]);
      }

      const total = faltante - valueAmount;
      setFaltante(Math.round(total * 100) / 100);
      

      setValueAmount(0);
      dispatchClient({type: "SET_VALUE_PAYMENT_TYPE", payload: ""})
    } 
  };


  const discountTotal = () => {
    if(discount > 0){
      const totalDiscount = totalFinal - discount;
      if (discount > totalFinal) {
         return;
      }
      if(totalDiscount < 0){
        return;
      }

      setTotalFinal(totalDiscount);
      setDiscounState(discount);
      setDiscount(0);
      setFaltante(totalDiscount);


    }


  };



  const saveVoucher = async () => {
    setLoading(true);
    if(faltante  > 0){
      console.log("hola");
      return;
    }

    if (stateClient.name === "") {
      console.log("hola name");
      return;
    }
    if (stateClient.lastName === "") {
      console.log("hola lastName");
      return;
    }
   
    if (dni.length > 0 && dni.length < 8) {
      console.log("hola dni");
      return;
    }

    if (stateClient.valueTypeVoucher === "") {
      console.log("hola valueTypeVoucher");
      return;
    }

    if (stateClient.valueCash === "") {
      console.log("hola valueCash");
      return;
    }

    if (listPaymen.length === 0) {
      console.log("hola listPaymen");
      
      return;
    }
console.log("hola");




    const listPayment = listPaymen.map(item => { 
      return {
        idTypePayment: item.id,
        amount: item.amount,
      }
    })


      const objs = {
        idCommand : data?.id,
        idTypeVoucher: stateClient.valueTypeVoucher,
        cliente : {
          name: stateClient.name,
          lastName: stateClient.lastName,
          dni: dni
        },
        listPayment: listPayment,
        discount: discounState,
        Igv: igv,
        subTotal: subTotal,
        total : totalFinal,
        idCash: stateClient.valueCash,
        idEmployee  : user?.id,
      }

      try {
        console.log("hola");
        const data = await axiosObject.post("/api/voucher", objs);
        console.log(data);
        if (data.status == 200) {
          AlertMessage("Agregado!" , "Se agrego correctamente", "success").then(() => {
            window.location.href = "/commands";
          });
        }


      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }

  };

 

  return (
    <Modal
      open={state.modalVocher}
      onClose={() => dispatch({ type: "SET_MODAL_VOCHER", payload: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalVocher.modal}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            variant={"h5"}
            align={"left"}
            color={"#6610f2"}
            sx={{ fontWeight: "bold" }}
          >
            FACTURA
          </Typography>

          <Box>
            <Chip
              color="primary"
              sx={{ marginRight: 2, padding: "0.5rem" }}
              icon={<ViewStreamIcon />}
              label={data?.id}
            />
            <Chip
              color="primary"
              sx={{ padding: "0.5rem" }}
              icon={<TableRestaurantIcon />}
              label={data?.numTable}
            />
          </Box>
        </Box>
        <hr />
        <Grid container spacing={4}>
          {/* FORMS */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant={"h6"}
                  align={"center"}
                  color={"primary"}
                  sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                >
                  DATOS PRINCIPALES
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <SelectCustom<IVoucherTypeGet>
                  label={"Tipo de Factura"}
                  id={"typeDocument"}
                  ListOptions={objsList.listTypeVoucher}
                  value={stateClient.valueTypeVoucher}
                  onChange={(e) => {
                    dispatchClient({
                      type: "SET_VALUE_TYPE_VOUCHER",
                      payload: e.target.value,
                    })
                  }}
                  idKey="id"
                  nameKey="name"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputForm
                  label={"Descuento"}
                  id="descount"
                  type="number"
                  Icon={"S/."}
                  errorText="Ingrese un descuento valido"
                  isErrored={false}
                  value={discount}
                  onChange={(e) => {
                    const numero = Number(e.target.value);
                    if (numero > 0) {
                      setDiscount(numero);
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} mb={1}>
                <Button
                  sx={{
                    width: "50%",
                    marginLeft: "50%",
                    "@media (max-width: 960px)": {
                      width: "100%",
                      marginLeft: "0%",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    discountTotal();

                    }
                  }

                >
                  Agregar
                </Button>
              </Grid>

              <Grid item xs={12}>
                <SelectCustom<ICashGet>
                  label={"Caja"}
                  id={"Cash"}
                  ListOptions={objsList.listCash}
                  value={stateClient.valueCash}
                  onChange={(e) => {
                    dispatchClient({
                      type: "SET_VALUE_CASH",
                      payload: e.target.value,
                    })
                  }}
                  idKey="id"
                  nameKey="id"
                />
              </Grid>

              <Grid item xs={12}>
                <SelectCustom<IPayMethodGet>
                  label={"Tipo de Factura"}
                  id={"typeDocument"}
                  ListOptions={objsList.listPaymentType}
                  value={stateClient.valuePaymentType}
                  onChange={(e) => {
                    dispatchClient({
                      type: "SET_VALUE_PAYMENT_TYPE",
                      payload: e.target.value,
                    })
                  }}
                  idKey="id"
                  nameKey="paymethod"
                />
              </Grid>



              <Grid item xs={12}>
                <InputForm
                  label={"Monto"}
                  id="amount"
                  type="number"
                  Icon={"S/."}
                  errorText="Ingrese un monto valido"
                  isErrored={false}
                  value={valueAmount}
                  onChange={(e) => {
                    setValueAmount(Number(e.target.value));
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ () => addListPaymen() }
                  fullWidth
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>

            <hr />

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant={"h6"}
                  align={"center"}
                  color={"primary"}
                  sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                >
                  DATOS DEL CLIENTE
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <InputForm
                  label={"DNI"}
                  id="dni"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText="Ingrese un DNI valido"
                  isErrored={false}
                  value={dni}
                  onChange={
                    (e) => {
                      const string = e.target.value;
                      if (string.length > 8) {
                        return;
                      }

                      if (string.length > 0) {
                        setDni(string);
                      }
                    }
                  }
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <InputForm
                  label={"Nombre"}
                  id="name"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText="Ingrese un nombre valido"
                  isErrored={false}
                  disabled={habilitar}
                  value={stateClient.name}
                  onChange={(e) => {
                    const string = e.target.value;
                    if (string.length > 50) {
                      return;
                    }

                    if (string.length > 0) {
                      dispatchClient({
                        type: "SET_NAME",
                        payload: string,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputForm
                  label={"Apellido "}
                  id="lastname"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText=""
                  isErrored={false}
                  disabled={habilitar}
                  value={stateClient.lastName}
                  onChange={(e) => {
                    const string = e.target.value;
                    if (string.length > 50) {
                      return;
                    }
                    if (string.length > 0 || string.length < 50) {
                      dispatchClient({
                        type: "SET_LAST_NAME",
                        payload: string,
                      });
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography
              variant={"h5"}
              align={"center"}
              color={"primary"}
              sx={{ marginBottom: "1rem", fontWeight: "bold" }}
            >
              DETALLE DE LA FACTURA
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: 0,
                }}
              >
                <Typography
                  variant={"h6"}
                  align={"left"}
                  color={"gray"}
                  sx={{ fontWeight: "bold", mb: 0 }}
                >
                  Producto
                </Typography>
                <Typography
                  variant={"h6"}
                  align={"left"}
                  color={"gray"}
                  sx={{ fontWeight: "bold", mb: 0 }}
                >
                  Total
                </Typography>
              </Box>
              <hr style={{ width: "100%", color: "gray" }} />
              {state.data.listDishViewAndPost.map((item, index) => (
                <Box key={ramdonKey("dx")}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={"body1"}
                      align={"left"}
                      color={"#00"}
                      sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                    >
                      {item.nameDish}
                    </Typography>
                    <Typography
                      variant={"body1"}
                      align={"left"}
                      color={"#00"}
                      sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                    >
                      S./{item.total}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <hr style={{ width: "100%", color: "gray" }} />
              <Grid
                sx={{
                  mb: 0,
                  p: 0,
                }}
                container
              >
                <Grid item xs={6}>
                  <Typography
                    variant={"body1"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    Subtotal:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant={"h6"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    S/.{subTotal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <hr style={{ width: "100%", color: "gray" }} />
              <Grid
                sx={{
                  mb: 0,
                  p: 0,
                }}
                container
              >
                <Grid item xs={6}>
                  <Typography
                    variant={"body1"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    IGV:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant={"h6"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    S/.{igv.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <hr style={{ width: "100%", color: "gray" }} />
              <Grid
                sx={{
                  mb: 0,
                  p: 0,
                }}
                container
              >
                <Grid item xs={6}>
                  <Typography
                    variant={"body1"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    Descuento:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant={"h6"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    S/.{discounState.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <hr style={{ width: "100%", color: "gray" }} />
              <Grid
                sx={{
                  mb: 0,
                  p: 0,
                }}
                container
              >
                <Grid item xs={6}>
                  <Typography
                    variant={"body1"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant={"h6"}
                    align={"right"}
                    color={"#00"}
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      mb: 0,
                      p: 0,
                    }}
                  >
                    S/.{totalFinal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <hr />
            <Typography
              variant={"h5"}
              align={"right"}
              color={"gray"}
              sx={{ marginBottom: "1rem", fontWeight: "bold" }}
            >
              Falta pagar: S/. {faltante.toFixed(2)}
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{
                width: "100%",
                p: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: "0.5rem",
                gap: "1rem",
                overflowY: "auto",
                maxHeight: "12rem",
              }}
            >
              {listPaymen.map((item, index) => (
                <CardInfoOrder
                  total={item.amount}
                  title={item.name}
                  key={Date.now() + index}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        <hr />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Button 
          onClick={
            () => {
               dispatch({type: "SET_MODAL_VOCHER", payload: false})
            }

          }
          
          variant="contained" color="secondary" size="large">
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: "1rem" }}
            disabled={loading ? true : false }
            onClick={
              () => {
                 saveVoucher()

              }
            }
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormVoucher;
