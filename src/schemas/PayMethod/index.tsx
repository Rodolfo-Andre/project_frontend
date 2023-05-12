import { Yup } from "@/schemas";
import { IPayMethodPrincipal } from "@/interfaces";

const payMethodSchema: Yup.ObjectSchema<IPayMethodPrincipal> = Yup.object({
  paymethod: Yup.string().min(3).max(50).required(),
});

export default payMethodSchema;
