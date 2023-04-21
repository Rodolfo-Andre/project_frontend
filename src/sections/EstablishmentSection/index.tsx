import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import {
  EstablishmentUpdateForm,
  EstablishmentUpdateSkeleton,
} from "@/features";
import { IEstablishmentGet } from "@/interfaces";
import { getObject } from "@/services/HttpRequests";
import useSWR from "swr";

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
