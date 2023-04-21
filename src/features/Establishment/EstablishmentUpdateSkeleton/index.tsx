import { Grid, Skeleton } from "@mui/material";

const EstablishmentUpdateSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="rectangular" height={56} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="rectangular" height={56} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="rectangular" height={56} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="rectangular" height={56} />
      </Grid>

      <Grid item container xs={12} justifyContent={"end"}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EstablishmentUpdateSkeleton;
