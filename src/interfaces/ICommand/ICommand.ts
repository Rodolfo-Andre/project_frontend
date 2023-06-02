import { ITableGet } from "../ITable";
import { IUserPrincipal } from "../IUser";

export interface ICommand {
  id: number;
  tableRestaurantId: number;
  cantSeats: number;
  listDetails: DetailCommandOrder[];
  statesCommand: StatesCommand;
  user: IUserPrincipal;
  table: ITableGet;
}

interface StatesCommand {
  state: string;
}

interface DetailCommandOrder {
  dishId: string;
  cantDish: number;
  observation: string;
}

export type ICommandGet = {
  id: number;
  detailsComand: DishList[];
  statesCommand: StatesCommand;
  employee: Employee;
  tableRestaurant: TableRestaurant;
};

export type TableRestaurant = {
  numTable: number;
  stateTable: string;
  numSeats: number;
};

export type User = {
  employee: Employee;
  email: string;
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};

export type DishList = {
  dish: Dish;
  cantDish: number;
  observation: string;
};

export type Dish = {
  id: string;
  categoryDish: CategoryDish;
  nameDish: string;
  priceDish: number;
  imgDish: string;
};

export type CategoryDish = {
  id: string;
  nameCatDish: string;
};
