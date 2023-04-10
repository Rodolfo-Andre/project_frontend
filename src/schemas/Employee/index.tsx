import { IEmployeePost, IEmployeePut } from "@/interfaces/IEmployee";
import { Yup } from "@/schemas";

const employeePostSchema: Yup.ObjectSchema<IEmployeePost> = Yup.object({
  firstName: Yup.string().min(3).max(50).required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  roleId: Yup.number().required(),
  user: Yup.object({
    email: Yup.string().email().required(),
  }),
});

const employeePutSchema: Yup.ObjectSchema<IEmployeePut> = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().min(3).max(50).required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  roleId: Yup.number().required(),
  user: Yup.object({
    email: Yup.string().email().required(),
  }),
});

export { employeePostSchema, employeePutSchema };
