import Yup from "@/schemas/Config";
import { ICategoryDishPrincipal } from "@/interfaces/ICategoryDish";

const categoryDishSchema: Yup.ObjectSchema<ICategoryDishPrincipal> = Yup.object(
  {
    nameCatDish: Yup.string()
      .min(3)
      .max(50)
      .matches(
        /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*(?:\s[A-ZÁÉÍÓÚÜÑa-záéíóúüñ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*)*$/,
        "La primera letra debe comenzar con mayúscula y tener solo un espacio entre cada palabra"
      )
      .required(),
  }
);

export default categoryDishSchema;
