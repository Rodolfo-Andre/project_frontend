import CssBaseline from "@mui/material/CssBaseline";
import ProgressBar from "@/components/ProgressBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthProvider } from "@/contexts/Auth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "../css/styles.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          {loading && <ProgressBar />}
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
