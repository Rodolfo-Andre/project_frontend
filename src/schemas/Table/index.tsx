import { Yup } from "@/schemas";
import { ITablePrincipal, ITableUpdate } from "@/interfaces";
import { TypeTableState } from "@/enum";

const tableCreateSchema: Yup.ObjectSchema<ITablePrincipal> = Yup.object({
  numSeats: Yup.number().integer().positive().max(9).required(),
});

const tableUpdateSchema: Yup.ObjectSchema<ITableUpdate> = Yup.object({
  numSeats: Yup.number().integer().positive().max(9).required(),
  stateTable: Yup.mixed<TypeTableState>()
    .oneOf(Object.values(TypeTableState))
    .required(),
});

export { tableCreateSchema, tableUpdateSchema };
