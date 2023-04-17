import { Yup } from "@/schemas";
import { IDishCreateOrUpdate } from "@/interfaces/IDish";

const dishSchema: Yup.ObjectSchema<IDishCreateOrUpdate> = Yup.object({
  nameDish: Yup.string().min(3).max(50).required(),
  priceDish: Yup.number()
    .typeError("Debe ser un número")
    .moreThan(0)
    .required(),
  categoryDishId: Yup.string().required(),
  imgDish: Yup.string().required(),
});

export { dishSchema };
