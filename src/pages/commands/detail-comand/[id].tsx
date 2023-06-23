import FormCommand from "@/components/Command/formCommand";
import FormDishCommand from "@/components/Command/formDishCommand";
import ContentBox from "@/components/ContentBox";
import Layout from "@/components/Layout";
import LoaderCustom from "@/components/Loader";
import { CommandContext } from "@/contexts/Command";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { InputForm } from "@/components/InputForm";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormVoucher from "@/components/Command/VoucherForm";
import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
const style = {
  titulo: {
    m: 4,
    fontWeight: "bold",
    color: "#637381",
  },
  containerForm: {},
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
const DetalleComanda = () => {
  const { query, isReady } = useRouter();
  const { setIdTable, loading, data, state, dispatch } =
    useContext(CommandContext);

  useEffect(() => {
    const id = Number(query.id ?? 0);
    if (!isReady) return;
    setIdTable(Number(id));
  }, [isReady]);

  if (loading) {
    return <LoaderCustom />;
  }

  // if (isError && !loading) {
  //   AlertMessage("Error!", "No se pudo cargar la comanda", "error").then(() => {
  //     window.location.href = "/commands";
  //   });
  //   return <LoaderCustom />;
  // }

  return (
    <Layout>
      <ContentBox>
        {data && (
          <Grid container>
            <FormCommand data={data} />

            <FormDishCommand />
          </Grid>
        )}

        {state.modal.selectDish !== null && (
          <Modal
            open={state.modal.open}
            onClose={() =>
              dispatch({
                type: "SET_MODAL",
                payload: {
                  ...state.modal,
                  open: false,
                  selectDish: null,
                },
              })
            }
            aria-labelledby="modal"
            aria-describedby="modal-description"
          >
            <Box sx={style.modal}>
              <Typography
                variant="h5"
                color={"primary"}
                sx={{ marginBottom: 2, textAlign: "center" }}
              >
                {state.modal.selectDish.nameDish}
              </Typography>

              <Box sx={style.containerModal}>
                <InputForm
                  errorText=""
                  Icon={<FastfoodIcon color="primary" />}
                  id="desc-name-dish"
                  label="Nombre"
                  value={state.modal.selectDish.nameDish}
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
                  value={state.modal.selectDish.priceDish}
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
                  value={state.modal.selectDish.quantity}
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
                  value={state.modal.selectDish.observation}
                  type="string"
                  onChange={(event) => {}}
                  isErrored={false}
                  disabled={true}
                />
              </Box>
            </Box>
          </Modal>
        )}

        {state.modalVocher && <FormVoucher />}
      </ContentBox>
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: DetalleComanda,
  roles: ["Administrador", "Cajero", "Mesero", "Cocinero"],
});
