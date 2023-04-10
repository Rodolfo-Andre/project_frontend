import { StaticImageData } from "next/image";

interface IErrorProps {
  title: string;
  code: number;
  description: string;
  img: StaticImageData;
  home: string;
}

export default IErrorProps;
