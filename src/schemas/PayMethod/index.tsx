import Yup from "@/schemas/Config";
import { IPayMethodPrincipal } from "@/interfaces/IPayMethod";

const payMethodSchema: Yup.ObjectSchema<IPayMethodPrincipal> = Yup.object({
  paymethod: Yup.string()
    .min(3)
    .max(50)
    .matches(
      /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*(?:\s[A-ZÁÉÍÓÚÜÑa-záéíóúüñ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*)*$/,
      "La primera letra debe comenzar con mayúscula y tener solo un espacio entre cada palabra"
    )
    .required(),
});

export default payMethodSchema;
