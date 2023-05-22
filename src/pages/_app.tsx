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
import "../css/styles.css";

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
