import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { AxiosError } from "axios";
import { MutableRefObject } from "react";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

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

export { handleLastPageDeletion, uploadToCloudinary };

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
