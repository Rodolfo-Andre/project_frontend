import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface IContentCenterProps {
  children: ReactNode;
  sxProps?: SxProps;
}

const ContentCenter = ({ children, sxProps }: IContentCenterProps) => {
  return (
    <Box
      sx={{
        ...sxProps,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentCenter;
