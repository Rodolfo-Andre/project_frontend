import { TypeTableState } from "@/enum";
import { type } from "os";

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
  numTable: number;
  stateTable: string;
  numSeats: number;
  listComand: ListComand[];
};

export type ListComand = {
  id: number;
  detailsComand: any[];
  statesCommand: StatesCommand;
  user: User;
};

export type StatesCommand = {
  state: string;
};

export type User = {
  employee: null;
  email: string;
};
export type StateTable  = 'Libre' | 'Ocupado'
type ITableWithComand = {
    numTable:      number;
    numSeats:      number;
    stateTable:    StateTable;
    commands:      commandActive[];
    commandActive: commandActive;
    hasCommands:   boolean;
};
type commandActive = {
  id: number,  
    cantSeats: number,  
    precTotOrder: number,  
    createdAt: string,  
    employeeId: number,  
    employeeName: string,  
    statesCommandId: number,  
    statesCommandName:  string,
    detailsComand: DetailsComand[]
    
};

type DetailsComand = {
    id  : number,
    cantDish  :  number,
    precDish  :  number,
    precOrder  :  number,
    observation  :  string,
    dish  :  DishCustom
}

type DishCustom = {
   id   : string,
   nameDish   : string,
   priceDish   : number,
   imgDish   : string,
   categoryDishId   : string,
   categoryDishName   : string,
}

interface ITableWithComand2 extends commandActive{
  numTable: number;
  numSeats: number;
  stateTable: string;
  isCommandActive : boolean;

}

export type { ITablePrincipal, ITableUpdate, ITableGet, ITableWithComand,ITableWithComand2 };
