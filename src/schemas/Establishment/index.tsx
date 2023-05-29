import Yup from "@/schemas/Config";
import { IEstablishmentPrincipal } from "@/interfaces/IEstablishment";

const establishmentSchema: Yup.ObjectSchema<IEstablishmentPrincipal> =
  Yup.object({
    name: Yup.string().min(3).max(50).required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
    ruc: Yup.string().required(),
  });

export default establishmentSchema;
