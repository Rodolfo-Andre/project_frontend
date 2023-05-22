import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import AddCard from "@mui/icons-material/AddCard";
import PayMethodTable from "@/features/PayMethod/PayMethodTable";
import PayMethodAddForm from "@/features/PayMethod/PayMethodAddForm";
import Box from "@mui/material/Box";
import ButtonAdd from "@/components/ButtonAdd";
import LoaderComponent from "@/components/LoaderComponent";
import useSWR from "swr";
import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces/IPayMethod";
import { FormikProps } from "formik/dist/types";
import { showForm } from "@/lib/Forms";
import { fetchAll } from "@/services/HttpRequests";

const PayMethodSection = () => {
  let formikRef: FormikProps<IPayMethodPrincipal>;
  const { data, isLoading } = useSWR("api/paymethod", () =>
    fetchAll<IPayMethodGet>("api/paymethod")
  );

  if (isLoading) return <LoaderComponent />;

  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Métodos de Pagos
        </Typography>

        <ButtonAdd
          text="Añadir Método de Pago"
          openDialog={() => {
            showForm({
              title: "Añadir Método de Pago",
              cancelButtonText: "CANCELAR",
              confirmButtonText: "AÑADIR",
              customClass: {
                confirmButton: "custom-confirm custom-confirm-create",
              },
              icon: (
                <AddCard
                  sx={{
                    display: "block",
                    margin: "auto",
                    fontSize: "5rem",
                    color: "#0D6EFD",
                  }}
                  color="primary"
                />
              ),
              contentHtml: (
                <PayMethodAddForm setFormikRef={(ref) => (formikRef = ref)} />
              ),
              preConfirm: async () => {
                await formikRef.submitForm();
                if (formikRef && !formikRef.isValid) {
                  return false;
                }
              },
            });
          }}
        />
      </Box>

      <PayMethodTable data={data!} />
    </ContentBox>
  );
};

export default PayMethodSection;
