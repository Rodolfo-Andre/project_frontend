import { IEmployeeCreateOrUpdate } from "@/interfaces/IEmployee";
import { Yup } from "@/schemas";

const employeeCreateOrUpdateSchema: Yup.ObjectSchema<IEmployeeCreateOrUpdate> =
  Yup.object({
    firstName: Yup.string().min(3).max(50).required(),
    lastName: Yup.string().required(),
    phone: Yup.string().required(),
    roleId: Yup.number().typeError("Debe ser un número").integer().required(),
    user: Yup.object({
      email: Yup.string().email().required(),
    }),
  });

export { employeeCreateOrUpdateSchema };
