import Yup from "@/schemas/Config";
import { IPayMethodPrincipal } from "@/interfaces/IPayMethod";

const payMethodSchema: Yup.ObjectSchema<IPayMethodPrincipal> = Yup.object({
  paymethod: Yup.string().min(3).max(50).required(),
});

export default payMethodSchema;
