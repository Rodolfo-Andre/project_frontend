import { AuthContext } from "@/contexts/Auth";
import { Typography, Grid, TextField, Avatar } from "@mui/material";
import { useContext } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { ContentBox } from "@/components";
import { url } from "gravatar";
import dayjs from "dayjs";

const AccountForm = () => {
  const { user } = useContext(AuthContext);
  const avatar_url = url(user!.user.email, { d: "identicon" }, true);
  const date_created_at = dayjs(user!.createdAt);

  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Mi Información
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center", marginY: 2 }}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          <Avatar
            sx={{ width: "80px", height: "auto", margin: "auto" }}
            alt="avatar"
            src={avatar_url}
          />
        </Grid>
        <Grid item sx={{ flexGrow: "7 !important" }} xs={12} sm>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombres"
                  defaultValue={user?.firstName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellidos"
                  defaultValue={user?.lastName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teléfono"
                  defaultValue={user?.phone}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Correo Eletrónioo"
                  defaultValue={user?.user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Role"
                  defaultValue={user?.role.roleName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Fecha de creción"
                  defaultValue={date_created_at}
                  readOnly
                  slotProps={{
                    textField: { variant: "standard", fullWidth: true },
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ContentBox>
  );
};

export default AccountForm;
