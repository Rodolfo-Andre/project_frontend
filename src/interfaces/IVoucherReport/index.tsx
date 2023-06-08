import { ICustomerGet } from "@/interfaces/ICustomer";
import { IVoucherTypeGet } from "@/interfaces/IVoucherType";
import { IEmployeeGet } from "@/interfaces/IEmployee";
import { ICashGet } from "@/interfaces/ICash";

interface IVoucherReportGet {
  id: number;
  dateIssued: Date;
  totalPrice: number;
  customer: ICustomerGet;
  voucherType: IVoucherTypeGet;
  employee: IEmployeeGet;
  cash: ICashGet;
}

interface ISalesDataPerDate {
  dateIssued: Date;
  accumulatedSales: number;
  numberOfGeneratedReceipts: number;
  quantityOfDishSales: number;
  bestSellingDish: string;
}

export type { IVoucherReportGet, ISalesDataPerDate };
