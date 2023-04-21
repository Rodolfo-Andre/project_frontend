import { IEstablishmentPrincipal } from "@/interfaces";
import { Yup } from "@/schemas";

const establishmentSchema: Yup.ObjectSchema<IEstablishmentPrincipal> =
  Yup.object({
    name: Yup.string().min(3).max(50).required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
    ruc: Yup.string().required(),
  });

export { establishmentSchema };
