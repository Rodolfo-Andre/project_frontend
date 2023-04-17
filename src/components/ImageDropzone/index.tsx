import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import Image from "next/image";
import ContentCenter from "../ContentCenter";

interface IImageDropzoneProps {
  onDrop: (file: File) => void;
  isSubmitting: boolean;
  imageDish?: string;
}

const ImageDropzone = ({
  onDrop,
  isSubmitting,
  imageDish,
}: IImageDropzoneProps) => {
  const [image, setImage] = useState<string | null>(imageDish || null);

  const handleDrop = (acceptedFiles: File[]) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setImage(url);
    onDrop(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: handleDrop,
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(image!);
  }, [image]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        height: 180,
        border: "1px dashed rgba(0, 0, 0, 0.12)",
        margin: "auto",
        backgroundColor: "#f4f6f8",
        cursor: isSubmitting ? "normal" : "pointer",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} disabled={isSubmitting} />
      {image ? (
        <Image
          src={image}
          alt={`Dish Image`}
          width={800}
          height={600}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onLoad={() => {
            URL.revokeObjectURL(image);
          }}
        />
      ) : (
        <ContentCenter sxProps={{ flexDirection: "column", color: "#919eab" }}>
          <AddAPhoto />
          <Typography>Carga una imagen</Typography>
        </ContentCenter>
      )}
    </Box>
  );
};

export default ImageDropzone;
