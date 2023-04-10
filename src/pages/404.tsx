import { ContentCenter, Error } from "@/components";
import { IErrorProps } from "@/interfaces";
import Route from "next/router";
import image404 from "public/404.png";

const Custom404 = () => {
  const error404: IErrorProps = {
    title: `Página no encontrada`,
    code: 404,
    description: `La ruta '${Route.asPath}' no existe`,
    img: image404,
    home: "/",
  };

  return (
    <ContentCenter sxProps={{ minHeight: "100vh" }}>
      <Error {...error404}></Error>
    </ContentCenter>
  );
};

export default Custom404;
