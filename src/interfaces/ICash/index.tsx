import { IEstablishmentGet } from "../IEstablishment";

interface ICashPrincipal {
  establishmentId?: number;
}

interface ICashGet {
  id: number;
  establishment: IEstablishmentGet;
}


export type { ICashPrincipal, ICashGet };
