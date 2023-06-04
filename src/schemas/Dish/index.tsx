import Yup from "@/schemas/Config";
import { IDishCreateOrUpdate } from "@/interfaces/IDish";

const dishSchema: Yup.ObjectSchema<IDishCreateOrUpdate> = Yup.object({
  nameDish: Yup.string()
    .min(3)
    .max(50)
    .matches(
      /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*(?:\s[A-ZÁÉÍÓÚÜÑa-záéíóúüñ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]*)*$/,
      "La primera letra debe comenzar con mayúscula y tener solo un espacio entre cada palabra"
    )
    .required(),
  priceDish: Yup.number()
    .typeError("Debe ser un número")
    .moreThan(0)
    .lessThan(400)
    .required(),
  categoryDishId: Yup.string().required(),
  imgDish: Yup.string().required(),
});

export default dishSchema;
