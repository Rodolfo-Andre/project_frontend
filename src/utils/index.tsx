import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { AxiosError } from "axios";
import { MutableRefObject } from "react";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
import { esES as dataGridEsES } from "@mui/x-data-grid";
import { esES as datePickersEsES } from "@mui/x-date-pickers";

const handleLastPageDeletion = (
  gridApiRef: MutableRefObject<GridApiCommunity>,
  size: number
) => {
  const pageSize = gridApiRef.current.state.pagination.paginationModel.pageSize;
  const currentPage = gridApiRef.current.state.pagination.paginationModel.page;
  const lastPage = Math.ceil(size / pageSize) - 1;

  if (currentPage === lastPage && (size % pageSize === 1 || pageSize === 1)) {
    gridApiRef.current.setPage(currentPage - 1);
  }
};

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "ocg0xuaa");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpfhjk0sw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const result: any = await response.json();

    return result.url;
  } catch (error) {
    console.log(error);
  }
};



export const handleError = (error: any) => {
  const errores = error as AxiosError;
  const { response, status } = errores;
  const text = "Comuníquese con Soporte Técnico";
  if (!response) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });

    return;
  }

  if (status === 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  }
  const { message } = response.data as { message: string };
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message ?? response.data,
  });
};

type ICons = "success" | "error" | "warning" | "info" | "question";
export const AlertMessage = (
  title: string,
  text: string,
  icon: ICons,
  props?: SweetAlertOptions
): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "Ok",
    ...props,
  });
};
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

export { handleLastPageDeletion, uploadToCloudinary, theme };
