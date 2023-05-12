import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import EstablishmentUpdateForm from "@/features/Establishment/EstablishmentUpdateForm";
import EstablishmentUpdateSkeleton from "@/features/Establishment/EstablishmentUpdateSkeleton";
import useSWR from "swr";
import { IEstablishmentGet } from "@/interfaces";
import { getObject } from "@/services/HttpRequests";

const EstablishmentSection = () => {
  const { data } = useSWR("api/establishment/first", () =>
    getObject<IEstablishmentGet>("api/establishment/first")
  );

  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Actualizar Establecimiento
      </Typography>

      {data ? (
        <EstablishmentUpdateForm establishment={data} />
      ) : (
        <EstablishmentUpdateSkeleton />
      )}
    </ContentBox>
  );
};

export default EstablishmentSection;
