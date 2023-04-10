import { ContentCenter, Error } from "@/components";
import { IErrorProps } from "@/interfaces";
import image403 from "public/403.png";

const Custom403 = () => {
  const error403: IErrorProps = {
    title: `Página prohibida`,
    code: 403,
    description: `No tienes los permisos necesarios para visualizar esta página`,
    img: image403,
    home: "/",
  };

  return (
    <ContentCenter sxProps={{ minHeight: "100vh" }}>
      <Error {...error403}></Error>
    </ContentCenter>
  );
};

export default Custom403;
