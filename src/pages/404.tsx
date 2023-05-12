import ContentCenter from "@/components/ContentCenter";
import ErrorContent from "@/components/ErrorContent";
import Route from "next/router";
import image404 from "public/404.png";
import { IErrorProps } from "@/interfaces";

const Custom404 = () => {
  const error404: IErrorProps = {
    title: `Página no encontrada`,
    code: 404,
    description: `La ruta '${Route.asPath}' no existe`,
    img: image404,
    home: "/",
  };

  return (
    <ContentCenter sxProps={{ minHeight: "100svh" }}>
      <ErrorContent {...error404}></ErrorContent>
    </ContentCenter>
  );
};

export default Custom404;
