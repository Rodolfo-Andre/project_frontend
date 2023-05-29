interface IPayMethodPrincipal {
  paymethod: string;
}

interface IPayMethodGet extends IPayMethodPrincipal {
  id: string;
}

export type { IPayMethodPrincipal, IPayMethodGet };


export type PayMethod = {
  id: number;
  paymethod: string;
};
