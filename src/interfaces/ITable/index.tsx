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

export type ITableGetCommand = {
  numTable:   number;
  stateTable: string;
  numSeats:   number;
  listComand: ListComand[];
}

export type ListComand = {
  id:            number;
  detailsComand: any[];
  statesCommand: StatesCommand;
  user:          User;
}

export type StatesCommand = {
  state: string;
}

export type User = {
  employee: null;
  email:    string;
}


export type { ITablePrincipal, ITableUpdate, ITableGet };
