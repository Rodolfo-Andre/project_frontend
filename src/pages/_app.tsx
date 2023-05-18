import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
import { AlertProvider } from "@/contexts/AlertSuccess";
import { AuthProvider } from "@/contexts/Auth";
import {
  LocalizationProvider,
  esES as datePickersEsES,
} from "@mui/x-date-pickers";
import { esES as dataGridEsES } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme(
    {
      components: {
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            "&::-webkit-scrollbar": {
              width: "7px",
              height: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#555",
              },
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
          }),
        },
      },
      palette: {
        primary: {
          dark: "#063FB6",
          main: "#0D6EFD",
          light: "#6DB4FE",
          contrastText: "#FFFFFF",
        },
      },
    },
    esES,
    datePickersEsES,
    dataGridEsES
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AlertProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </AlertProvider>
    </LocalizationProvider>
  );
}
