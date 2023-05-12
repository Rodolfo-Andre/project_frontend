import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { ISignIn } from "@/interfaces";
import { useSignIn } from "@/hooks";
import { styled } from "@mui/material/styles";

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))<TextFieldProps>(({ theme, error }) => ({
  "& .MuiFilledInput-root": {
    border: `1px solid ${error ? theme.palette.error.main : "#5197FF"}`,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#FFF !important",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: `${error ? theme.palette.error.main : "#5197FF"}`,
  },
}));

const initialValues: ISignIn = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formik, error] = useSignIn(initialValues);

  return (
    <Box
      overflow={"auto"}
      sx={{
        maxWidth: 350,
        marginX: 2,
        padding: 4,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5} marginY={2}>
          <Grid item xs={12}>
            <CustomTextField
              id="email"
              type="email"
              variant="filled"
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
            <CustomTextField
              id="password"
              type="password"
              variant="filled"
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
          sx={{ height: 56, borderRadius: 3 }}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth={true}
        >
          Ingresar al Sistema
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
