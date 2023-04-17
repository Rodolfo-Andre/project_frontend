import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { MutableRefObject } from "react";

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
