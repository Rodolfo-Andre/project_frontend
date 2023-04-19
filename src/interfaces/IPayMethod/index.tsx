interface IPayMethodPrincipal {
  paymethod: string;
}

interface IPayMethodGet extends IPayMethodPrincipal {
  id: string;
}

export type { IPayMethodPrincipal, IPayMethodGet };
