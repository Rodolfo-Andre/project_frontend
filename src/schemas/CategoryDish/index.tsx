import Yup from "@/schemas/Config";
import { ICategoryDishPrincipal } from "@/interfaces/ICategoryDish";

const categoryDishSchema: Yup.ObjectSchema<ICategoryDishPrincipal> = Yup.object(
  {
    nameCatDish: Yup.string().min(3).max(50).required(),
  }
);

export default categoryDishSchema;
