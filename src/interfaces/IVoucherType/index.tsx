interface IVoucherTypePrincipal {
  name: string;
}

interface IVoucherTypeGet extends IVoucherTypePrincipal {
  id: string;
}

export type { IVoucherTypePrincipal, IVoucherTypeGet };
