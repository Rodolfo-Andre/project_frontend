import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import type { ISignIn } from "@/interfaces";
import { useSignIn } from "@/hooks";

const initialValues: ISignIn = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formik, error] = useSignIn(initialValues);

  return (
    <Box overflow={"auto"} sx={{ maxWidth: 350, marginX: 2 }}>
      <Typography variant="h3" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5} marginY={2}>
          <Grid item xs={12}>
            <TextField
              id="email"
              type="email"
              label="Correo Electrónico"
              error={Boolean(formik.errors.email)}
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.errors.email}
              disabled={formik.isSubmitting}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="password"
              type="password"
              label="Contraseña"
              error={Boolean(formik.errors.password)}
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.errors.password}
              disabled={formik.isSubmitting}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="success"
          disabled={formik.isSubmitting}
          fullWidth={true}
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
