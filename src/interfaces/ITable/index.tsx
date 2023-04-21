import { TypeTableState } from "@/enum";

interface ITablePrincipal {
  numSeats: number;
}

interface ITableUpdate extends ITablePrincipal {
  stateTable: TypeTableState;
}

interface ITableGet extends ITablePrincipal {
  numTable: number;
  stateTable: string;
}

export type { ITablePrincipal, ITableUpdate, ITableGet };
