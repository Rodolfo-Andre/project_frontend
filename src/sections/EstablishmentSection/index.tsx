import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import EstablishmentUpdateForm from "@/features/Establishment/EstablishmentUpdateForm";
import useSWR from "swr";
import LoaderComponent from "@/components/LoaderComponent";
import { IEstablishmentGet } from "@/interfaces/IEstablishment";
import { getObject } from "@/services/HttpRequests";

const EstablishmentSection = () => {
  const { data, isLoading } = useSWR("api/establishment/first", () =>
    getObject<IEstablishmentGet>("api/establishment/first")
  );

  if (isLoading) return <LoaderComponent />;

  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Actualizar Establecimiento
      </Typography>

      <EstablishmentUpdateForm establishment={data!} />
    </ContentBox>
  );
};

export default EstablishmentSection;
