interface ICustomerPrincipal {
  firstName: string;
  lastName: string;
  phone: string;
  dni: string;
}

interface ICustomerGet extends ICustomerPrincipal {
  id: number;
}

export type { ICustomerPrincipal, ICustomerGet };
