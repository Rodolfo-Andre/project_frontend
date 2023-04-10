import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface IContentBoxProps {
  children: ReactNode;
  sxProps?: SxProps;
}

const ContentBox = ({ children, sxProps }: IContentBoxProps) => {
  return (
    <Box
      sx={{
        ...sxProps,
        backgroundColor: "#FFFFFF",
        boxShadow:
          "0 3px 10px -2px rgba(85,85,85,.08), 0 2px 20px 0 rgba(85,85,85,.06), 0 1px 30px 0 rgba(85,85,85,.03)",
        borderRadius: "0.3rem",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentBox;
