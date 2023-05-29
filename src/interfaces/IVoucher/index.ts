import { PayMethod } from "../IPayMethod";

export type Voucher = {
    id: number;
    customerName: string;
    dateIssued: string;
    numCom: number;
    totalPrice: number;
    establishmentName: string;
    voucherTypeName: string;
    voucherDetail: VoucherDetail;
  };
  
  export type VoucherDetail = {
    id: number;
    paymentAmount: number;
    payMethod: PayMethod;
  };
  export type Cash = {
    id: number;
    cashId: number;
    employeeId: number;
    fecAperture: Date;
    fecClose: Date;
    saleToDay: number;
  };
  