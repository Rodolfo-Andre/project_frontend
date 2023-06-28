 
import { Box, Modal, Typography, Grid, Chip, Button } from "@mui/material";
import { CommandContext } from "@/contexts/Command";
import BadgeIcon from "@mui/icons-material/Badge";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { InputForm } from "@/components/InputForm";
import SelectCustom from "@/components/Select";
import { useState, useEffect,useContext,useReducer,useMemo } from "react";
import { ICashGet, ICustomerGet, IPayMethodGet, IVoucherTypeGet } from "@/interfaces";
import axiosObject from "@/services/Axios";
import CardInfoOrder from "../CardInfoOrder";
import { AlertMessage, ramdonKey } from "@/utils";
import { AuthContext } from "@/contexts";
import Alert from '@mui/material/Alert';
import { useRouter } from "next/router";
 

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


type IStateErrors = {
   errorCboFactura: boolean;
   errorCboTipoPago: boolean;
   errorCboCaja: boolean;
   errorDescuento: boolean;
   errorMonto :{
      active: boolean;
      message: string;
   }
   contaienerError: {
      active: boolean;
      message: string;
   };
   errorCliente :{
      errorName: boolean;
      errorLastName: boolean;
      errorDni: boolean;
   }

}
type IActionErrors = {
    type: "SET_ERROR_CBO_FACTURA";
    payload: boolean  
} |
  {
    type: "SET_ERROR_DESCUENTO";
    payload: boolean;
  } |

  {
    type: "SET_ERROR_CBO_TIPO_PAGO";
    payload: boolean;
  } |

  {
    type: "SET_ERROR_CBO_CAJA";
    payload: boolean;
  }
  |
{
    type: "SET_ERROR_MONTO" 
    payload: {
      active: boolean;
      message: string;
    };
} |
{
    type: "SET_ERROR_CONTAINER";
    payload: {
      active: boolean;
      message: string;
    };
  }
| {
    type: "SET_ERROR_CLIENTE";
    payload: {
      errorName: boolean;
      errorLastName: boolean;
      errorDni: boolean;
    };
  };





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

const reducerErrors = (state: IStateErrors, action: IActionErrors) => {
  switch (action.type) {
    case "SET_ERROR_CBO_FACTURA":
      return { ...state, errorCboFactura: action.payload };
    case "SET_ERROR_DESCUENTO":
      return { ...state, errorDescuento: action.payload };
    case "SET_ERROR_CBO_TIPO_PAGO":
      return { ...state, errorCboTipoPago: action.payload };
    case "SET_ERROR_CBO_CAJA":
      return { ...state, errorCboCaja: action.payload };
    case "SET_ERROR_MONTO":
      return { ...state, errorMonto: action.payload };
    case "SET_ERROR_CONTAINER":
      return { ...state, contaienerError: action.payload };
    case "SET_ERROR_CLIENTE":
      return { ...state, errorCliente: action.payload };
    default:
      return state;
  }
};


const FormVoucher = () => {
   let saveDiscount = 0;
   const router = useRouter();
  const{user} = useContext(AuthContext);
  const { state, data, dispatch } = useContext(CommandContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [faltante, setFaltante] = useState(0);
  const [listPaymen, setListPaymen] = useState<IlistTypeCash[]>([])
  const [loadingDni, setLoadingDni] = useState(false);
   ///reducer cliente
    const [stateClient, dispatchClient] = useReducer(reducerClient, {
      name: "",
      lastName: "",
      dni: "",
      valueTypeVoucher: "",
      valuePaymentType: "",
      valueCash: "",
    });
    const [stateError, dispatchError] = useReducer(reducerErrors, {
      errorCboFactura: false,
      errorCboTipoPago: false,
      errorCboCaja: false,
      errorDescuento: false,
      errorMonto: {
        active: false,
        message: "",
      },
      contaienerError: {
        active: false,
        message: "",
      },
      errorCliente: {
        errorName: false,
        errorLastName: false,
        errorDni: false,
      },
    });

  const [objsList, setObjsList] = useState<IObjsList>({
    listPaymentType: [],
    listTypeVoucher: [],
    listCash : [],
  });
  const [habilitar, setHabilitar] = useState(true);
  const [habilitarDni, setHabilitarDni] = useState(false)
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
      dispatchError({ type: "SET_ERROR_CBO_TIPO_PAGO", payload: true });
      return;
    }
    dispatchError({ type: "SET_ERROR_CBO_TIPO_PAGO", payload: false });

    if(valueAmount === 0){
      dispatchError({ type: "SET_ERROR_MONTO", payload: {active: true, message: "El monto no puede ser 0"} });
      return;
    }

    dispatchError({ type: "SET_ERROR_MONTO", payload: {active: false, message: ""} });

    const exist = listPaymen.find(item => item.typePayment === valuePaymentTypea);
    if(exist){
    
      const newList = listPaymen.map(item => {
        if(item.typePayment === valuePaymentTypea){
          return {...item, amount: item.amount + valueAmount}
        }
        return item;
      });
      const nuevoTotal = newList.reduce((acc, item) => acc + item.amount, 0);
        const redondear = Math.round(nuevoTotal * 100) / 100;
        const redondearTotal = Math.round(totalFinal * 100) / 100;

      
      if(redondear > redondearTotal){
        dispatchError({ type: "SET_ERROR_MONTO", payload: {active: true, message: "El monto no puede ser mayor al total"} });
        return;
      }

      dispatchError({ type: "SET_ERROR_MONTO", payload: {active: false, message: ""} });

      const total = totalFinal - nuevoTotal;
      setFaltante(Math.round(total * 100) / 100);
      setValueAmount(0);
      setListPaymen(newList);
      dispatchClient({type: "SET_VALUE_PAYMENT_TYPE", payload: ""})
      return;
    
    }
    const amouthRedondeado = Math.round(valueAmount * 100) / 100;
    const faltaRedondeado = Math.round(faltante * 100) / 100;

    if(amouthRedondeado > faltaRedondeado ){
      dispatchError({ type: "SET_ERROR_MONTO", payload: {active: true, message: "El monto no puede ser mayor al total"} });
      return;
    }

    dispatchError({ type: "SET_ERROR_MONTO", payload: {active: false, message: ""} });

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

  const deleteListPaymen = (id : number) => {

     const newList = listPaymen.filter(item => item.id !== id);

      const nuevoTotal = newList.reduce((acc, item) => acc + item.amount, 0);

      const redondear = Math.round(nuevoTotal * 100) / 100;

      const redondearTotal = Math.round(totalFinal * 100) / 100;

      setListPaymen(newList);
      const total = redondearTotal - redondear;
      setFaltante(Math.round(total * 100) / 100);

  };


  const discountTotal = () => {
    if(discount === 0){
      dispatchError({ type: "SET_ERROR_DESCUENTO", payload: true });
      return;
    }

    if(discount > faltante){
      dispatchError({ type: "SET_ERROR_DESCUENTO", payload: true });
      return;
    }

    
    if(discount > totalFinal){
      dispatchError({ type: "SET_ERROR_DESCUENTO", payload: true });
      return;
    }

    const totalDiscount = totalFinal - discount;
    setTotalFinal(totalDiscount);
    setFaltante(totalDiscount);
    setDiscounState(discount);  
    saveDiscount += discount;
    dispatchError({ type: "SET_ERROR_DESCUENTO", payload: false });
    setDiscount(0);


  };

  const saveVoucher = async () => {

    const regexSoloLetras = /^[a-zA-Z ]*$/;

    dispatchError({type : "SET_ERROR_CONTAINER", payload: {active: false, message: ""}});

    if(faltante  > 0){
      dispatchError({type : "SET_ERROR_CONTAINER", payload: {active: true, message: "El monto no puede ser menor al total"}});
      return;
    }
    if (stateClient.valueTypeVoucher === "") {
      dispatchError({ type: "SET_ERROR_CBO_FACTURA", payload: true });
      return;
    }

    if (stateClient.valueCash === "") {
      dispatchError({ type: "SET_ERROR_CBO_CAJA", payload: true });
      return;
    }

    if (listPaymen.length === 0) {
      dispatchError({type : "SET_ERROR_CONTAINER", payload: {active: true, message: "Debe agregar un monto"}});
      return;
    }

    if (stateClient.name === "" || !regexSoloLetras.test(stateClient.name)) {
      dispatchError({ type: "SET_ERROR_CLIENTE", payload: {
          ...stateError.errorCliente,
           errorName: true,
      } });
      return;
    }

    if (stateClient.lastName === ""  || !regexSoloLetras.test(stateClient.lastName)) {
      dispatchError({ type: "SET_ERROR_CLIENTE", payload: {
          ...stateError.errorCliente,
           errorLastName: true,
      } });
      return;
    }




    const listPayment = listPaymen.map(item => { 
      return {
        idTypePayment: item.id,
        amount: item.amount,
      }
    })
    dispatchError({type : "SET_ERROR_CONTAINER", payload: {active: false, message: ""}});

    const igvFormat = Math.round(igv * 100) / 100;
    const totalFinalFormat = Math.round(totalFinal * 100) / 100;
    const discounStateFormat = Math.round(discounState * 100) / 100;


    

      const objs = {
        idCommand : data?.id,
        idTypeVoucher: stateClient.valueTypeVoucher,
        cliente : {
          name: stateClient.name,
          lastName: stateClient.lastName,
          dni: dni
        },
        listPayment: listPayment,
        discount:  discounStateFormat,
        Igv: igvFormat,
        total :  totalFinalFormat,
        idCash: stateClient.valueCash,
        idEmployee  : user?.id,
      }

      
      setLoading(true);
      try {
        const data = await axiosObject.post("/api/voucher", objs);
        if (data.status == 200) {
          dispatch({type : "SET_MODAL_VOCHER",payload : false})
          AlertMessage("Guardado!", "Se guardo correctamente", "success").then(() => {
             router.push("/commands");
          });
        }
      } catch (error) {
        console.log(error);
        
        dispatchError({type : "SET_ERROR_CONTAINER", payload: {active: true, message: "Error al guardar el voucher"}});
      }finally{
        setLoading(false);
      }
   
  };


  const findDni = async () => {
    const regexDni = /^[0-9]*$/;
    console.log(regexDni.test(dni));
     if(!regexDni.test(dni)){
       dispatchError({type:"SET_ERROR_CLIENTE",payload: { 
         ...stateError.errorCliente,
         errorDni: false,
       }});
     }


    if(dni.length === 8){
      setLoadingDni(true);
      try {
        const { data } = await axiosObject.get<ICustomerGet>(`/api/customer/dni/${dni}`);
        if (data) {
          setHabilitarDni(true);
          dispatchClient({type: "SET_NAME", payload: data.firstName});
          dispatchClient({type: "SET_LAST_NAME", payload: data.lastName});
        }else{
          setHabilitar(false);
        }
        
        
      } catch (error) {
        setHabilitar(false);
      }finally{
        setLoadingDni(false);
      }
    }
  };


  const onChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDni(value);

    if (value.length > 8) {
      dispatchError({type:"SET_ERROR_CLIENTE",payload: {
        ...stateError.errorCliente,
        errorDni: true,
      }});
    }

  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // const regex = /^[a-zA-Z ]*$/;
    // if(regex.test(value)){
    //   dispatchError({type: "SET_ERROR_CLIENTE", payload: {
    //     ...stateError.errorCliente,
    //     errorName: true,
    //   }})

    //   return;
    // }
    if (value.length > 20) {
      dispatchError({type: "SET_ERROR_CLIENTE", payload: {
        ...stateError.errorCliente,
        errorName: true,
      }})
      return;
    }

    dispatchClient({type: "SET_NAME", payload: value})
    dispatchError({type: "SET_ERROR_CLIENTE", payload: { 
      ...stateError.errorCliente,
      errorName: false,
    }})
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // const regex = /^[a-zA-Z ]*$/;
    // if(regex.test(value)){
    //   dispatchError({type: "SET_ERROR_CLIENTE", payload: {
    //     ...stateError.errorCliente,
    //     errorLastName: true,
    //   }})

    //   return;
    // }

    if (value.length > 20) {
      dispatchError({type: "SET_ERROR_CLIENTE", payload: {
        ...stateError.errorCliente,
        errorLastName: true,
      }})
      return;
    }



    dispatchClient({type: "SET_LAST_NAME", payload: value})
    dispatchError({type: "SET_ERROR_CLIENTE", payload: {
      ...stateError.errorCliente,
      errorLastName: false,
    }})

  };

  const onChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if(value > totalFinal){
      dispatchError({type: "SET_ERROR_DESCUENTO", payload: true})
      return;
    }

    if(value < 0 || isNaN(value)){
      dispatchError({type: "SET_ERROR_DESCUENTO", payload: true})
      return;
    }
    setDiscount(value);
    dispatchError({type: "SET_ERROR_DESCUENTO", payload: false})

  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if(value < 0 || isNaN(value)){
      dispatchError({type: "SET_ERROR_MONTO", payload: {
        active: true,
        message: "Ingrese un monto valido",
      }})
      return;
    }
    setValueAmount(value);
    dispatchError({type: "SET_ERROR_MONTO", payload: {
      active: false,
      message: "",
    }})
  };

  const listaDePagos =  useMemo(() => {
    return (
      listPaymen.map((item, index) => (
        <CardInfoOrder
          total={item.amount}
          title={item.name}
          key={Date.now() + index}
          deleteListPayment={() => deleteListPaymen(item.id)}
        />
      ))
    )

  }, [listPaymen]);
 

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
           <Grid
           item 
           xs={12}
           >
            {
              stateError.contaienerError.active && (
                <Alert severity="error">
                  {stateError.contaienerError.message}
                </Alert>
              )
            }  
           </Grid>
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
                  isError={stateError.errorCboFactura}
                  messageError="Seleccione un tipo de factura"
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
                  isErrored={stateError.errorDescuento}
                  value={discount}
                  onChange={onChangeDiscount}
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
                  isError={stateError.errorCboCaja}
                  messageError="Seleccione una caja"
                  idKey="id"
                  nameKey="id"
                />
              </Grid>

              <Grid item xs={12}>
                <SelectCustom<IPayMethodGet>
                  label={"Metodo"}
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
                  isError={stateError.errorCboTipoPago}
                  messageError="Seleccione un metodo"
                  nameKey="paymethod"
                />
              </Grid>
              <Grid item xs={12}>
                <InputForm
                  label={"Monto"}
                  id="amount"
                  type="number"
                  Icon={"S/."}
                  errorText={stateError.errorMonto.message}
                  isErrored={stateError.errorMonto.active}
                  value={valueAmount}
                  onChange={onChangeAmount}
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

            <Grid container 
            alignItems={"center"}
            spacing={1}>
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

              <Grid item xs={6} lg={6}>
                <InputForm
                  label={"DNI"}
                  id="dni"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText="Ingrese un DNI valido"
                  isErrored={stateError.errorCliente.errorDni}
                  value={dni}
                  disabled={habilitarDni}
                  onChange={onChangeDni}
                />
              </Grid>
              <Grid item xs={6} lg={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loadingDni || habilitarDni}
                  onClick={() => {
                    findDni();
                   }
                  }
                >
                  Agregar
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputForm
                  label={"Nombre"}
                  id="name"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText="Ingrese un nombre valido"
                  isErrored={stateError.errorCliente.errorName}
                  value={stateClient.name}
                  disabled={habilitar}
                  onChange={onChangeName}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputForm
                  label={"Apellido"}
                  id="lastname"
                  type="text"
                  Icon={<BadgeIcon />}
                  errorText="Ingrese un apellido valido"
                  isErrored={stateError.errorCliente.errorLastName}
                  value={stateClient.lastName}
                  disabled={habilitar}
                  onChange={onChangeLastName}
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
             {listaDePagos}
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
