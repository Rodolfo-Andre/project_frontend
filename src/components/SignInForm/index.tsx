import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useSignIn from "@/hooks/useSingIn";
import ISignIn from "@/interfaces/ISignIn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

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
              sx={{ border: "none" }}
              id="password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              label="Contraseña"
              error={Boolean(formik.errors.password)}
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.errors.password}
              disabled={formik.isSubmitting}
              fullWidth
              InputProps={{
                sx: {
                  "&:after, &:before": {
                    border: "none",
                  },
                  "&:hover:before": {
                    borderBottom: "none !important",
                  },
                  "&:before": {
                    borderBottomStyle: "none !important",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
