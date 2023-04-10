import { IErrorProps } from "@/interfaces";
import { Typography, Box, Link } from "@mui/material";
import Image from "next/image";

const Error = ({ title, code, description, img, home }: IErrorProps) => {
  return (
    <Box
      sx={{
        maxWidth: 850,
        margin: "auto 2rem",
      }}
    >
      <Typography align="center" variant="h3" gutterBottom={true}>
        Error {code} - {title}
      </Typography>
      <Typography align="center" variant="h6" paragraph={true}>
        {description}
      </Typography>
      <Image
        src={img}
        alt={`Error ${code}`}
        style={{
          width: "100%",
          height: "clamp(200px, 20vw + 240px, 500px)",
          objectFit: "contain",
        }}
      />
      <Link href={home} fontSize={20} alignItems={"center"}>
        ⏪ Ir al inicio
      </Link>
    </Box>
  );
};

export default Error;
