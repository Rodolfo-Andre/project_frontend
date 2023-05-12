import { Yup } from "@/schemas";
import { ICashPrincipal } from "@/interfaces";

const cashSchema: Yup.ObjectSchema<ICashPrincipal> = Yup.object({
  establishmentId: Yup.number()
    .typeError("Debe ser un número")
    .integer()
    .required(),
});

export default cashSchema;
