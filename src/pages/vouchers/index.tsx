import React, { useEffect, useReducer, useState } from "react";
import {
  ComboBox,
  ContentBox,
  DataTable,
  Layout,
  ProtectedRouteForAuthenticated,
} from "@/components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { IInput, SearchForm } from "../../components/SearchForm/index";
import { Autocomplete, Grid, TextField } from "@mui/material";
import {
  apertureServices,
  apertureServicesAsync,
} from "@/services/apis/aperture-services";
import { handleError } from "@/utils";
import { AxiosError } from "axios";
import { Aperture } from "@/interfaces/IAperture";
import { Voucher } from "@/interfaces/IVoucher";
import SearchForm, { IInput } from "@/components/SearchForm";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "customerName", headerName: "Customer Name", width: 250 },
  { field: "dateIssued", headerName: "Date Issued", width: 250 },
  { field: "numCom", headerName: "Num° Comrpobantes", width: 250 },
  { field: "totalPrice", headerName: "Total Price", width: 130 },
  {
    field: "establishmentName",
    headerName: "Establishment Name",
    width: 250,
  },
  { field: "voucherTypeName", headerName: "Voucher Type", width: 250 },
];
const inputs: IInput[] = [
  {
    placeholder: "Customer Name",
    id: "customerName",
    type: "text",
    value: "",
    validation: {},
    isCombo: false,
    options: [],
  },

  {
    placeholder: "Price",
    id: "price",

    type: "number",
    value: "",
    validation: {},
    isCombo: false,
    options: [],
  },
  {
    placeholder: "Pay Method",
    id: "payMethod",
    type: "text",
    value: "",
    validation: {},
    isCombo: true,
    options: [],
  },
];
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [listadoCash, setListadoCash] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [cashId, setCashId] = useState<null | string>(null);
  const [apertureId, setApertureId] = useState(0);
  const [aperture, setAperture] = useState<Aperture | null>();
  const [total, setTotal] = useState(0);
  const [totalByMethod, setTotalByMethod] = useState<null | any[]>(null);
  const [inputState, setInputs] = useState(inputs);

  useEffect(() => {
    setLoading(true);
    const responseCash = async () => {
      try {
        const promises = Promise.all([
          apertureServicesAsync.getPayMethods(),
          apertureServicesAsync.getListIdCash(),
        ]);
        const [payMethods, listIdCash] = await promises;

        if (payMethods) {
          setInputs((prev) => {
            const newInputs = [...prev];
            const index = newInputs.findIndex(
              (input) => input.id === "payMethod"
            );
            newInputs[index].options = payMethods;
            return newInputs;
          });
        }
        if (listIdCash) {
          setListadoCash(listIdCash);
        }
        console.log(payMethods, listIdCash);
        console.log(inputs);
      } catch (error) {
        handleError(error as AxiosError);
      } finally {
        setLoading(false);
      }

      setLoading(false);
    };
    responseCash();

    return () => {
      setListadoCash([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const dataServies = data as Voucher[];
      const tptal = apertureServices.totalReduce(dataServies);
      const totaByMethods = apertureServices.totalByMethodsReduce(dataServies);
      setTotal(tptal);
      setTotalByMethod(totaByMethods);
    }
  }, [data, loading]);

  const onChangeEvent = async (event: any, newValue: any | null) => {
    if (newValue === null) {
      return;
    }
    setLoading(true);
    try {
      setCashId(newValue);
      const dataAperure = await apertureServicesAsync.getApertureById(
        parseInt(newValue)
      );
      if (!dataAperure) {
        return;
      }
      const apertureGet = dataAperure;
      setApertureId(apertureGet.id);
      setAperture(apertureGet);
      if (apertureGet.fecClose == null || apertureGet.fecClose == undefined) {
        setIsOpen(true);
        setIsClosed(false);
        return;
      }
      setIsOpen(false);
      setIsClosed(true);

      console.log(isOpen, isClosed);
    } catch (error) {
      const errores = error as AxiosError;
      handleError(errores);
    } finally {
      setLoading(false);
    }
  };

  const createAperture = async () => {
    try {
      if (cashId === null) {
        return;
      }
      const data = await apertureServicesAsync.createAperture(parseInt(cashId));
      if (data) {
        setCashId(data.cashId.toString());
        setApertureId(data.id);
        setAperture(data);
        setIsOpen(false);
        setIsClosed(true);
      }
    } catch (error) {}
  };

  const closeAperture = async () => {
    if (cashId === null) {
      return;
    }
    const data = await apertureServicesAsync.updateAperture(apertureId);
    if (data) {
      setIsOpen(true);
      setIsClosed(true);
      setCashId(data.cashId.toString());
      setApertureId(data.id);
    }
  };

  return (
    <Layout>
      <ContentBox
        sxProps={{
          padding: 2,
        }}
      >
        <Typography
          sx={{
            mt: 2,
            mb: 3,
          }}
          variant="h5"
          align="left"
        >
          Caja Registradora
        </Typography>

        <Box width={"auto"} display={"flex"} sx={{ gap: 2, p: 2 }}>
          <Button
            disabled={loading || isOpen || !cashId}
            onClick={() => createAperture()}
            type="button"
            variant="outlined"
            color="success"
          >
            Abrir
          </Button>
          <Button
            disabled={loading || isClosed || !cashId}
            type="button"
            onClick={() => closeAperture()}
            variant="outlined"
            color="error"
          >
            Cerrar
          </Button>
        </Box>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <Autocomplete
            disablePortal
            disabled={loading}
            id="id-cbo-aperture"
            options={listadoCash}
            value={cashId}
            onChange={onChangeEvent}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="id" />}
          />
        </Box>

        <Typography
          variant="h6"
          marginTop={2}
          sx={{
            fontWeight: "semiBold",
          }}
        >
          Venta Total:
        </Typography>

        {!loading && (
          <SearchForm
            api="api/Voucher/listado"
            inputs={inputState}
            paginado={{
              pagina: 1,
              tamanio: 10,
            }}
            parmas={{
              apertureId: apertureId,
            }}
            setData={setData}
          />
        )}

        <Box display={"flex"} flexDirection={"row"} gap={2}></Box>

        <Grid
          sx={{
            mt: 10,
          }}
          container
          spacing={2}
          gap={2}
          justifyContent={"center"}
          direction={"row"}
          columns={12}
        >
          {totalByMethod &&
            totalByMethod.length > 0 &&
            totalByMethod.map((d, id) => (
              <Grid
                key={id}
                sx={{
                  border: "1px solid",
                  borderRadius: "10px",
                  p: 1,
                  textAlign: "center",
                }}
                item
                xs={3}
              >
                <Typography
                  variant="h6"
                  marginTop={2}
                  sx={{
                    fontWeight: "semiBold",
                  }}
                >
                  {d.name}
                </Typography>
                <Typography
                  variant="h6"
                  marginTop={2}
                  sx={{
                    fontWeight: "semiBold",
                  }}
                >
                  {d.total}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </ContentBox>
    </Layout>
  );
};
export default ProtectedRouteForAuthenticated({ Component: Index });
