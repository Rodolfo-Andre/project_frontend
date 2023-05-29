import { ICommand } from "@/interfaces/ICommand/ICommand";
import { AxiosServices } from "..";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";
import { IDishGet } from "@/interfaces/IDish";

export const getCommands = async () => {
  const { data } = await AxiosServices.get("api/Command");
  const commands = data as ICommand[];
  return commands;
};

export const getCategoryDishes = async () => {
  const { data } = await AxiosServices.get("api/CategoryDish");
  const categoryDishes = data as ICategoryDishGet[];
  return categoryDishes;
};

export const getDishesByCategory = async (id: string) => {
  const { data } = await AxiosServices.get(`api/dish/category/${id}`);
  console.log(data);
  const dishes = data as IDishGet[];
  return dishes;
};

export interface ICreateCommand {
  tableRestaurantId: number;
  cantSeats: number;
  listDetails: IDetailCommandOrder[];
}

interface IDetailCommandOrder {
  dishId: string;
  cantDish: number;
  observation: string;
}

export const createCommand = async (command: ICreateCommand) => {
  const { data } = await AxiosServices.post("api/Command", command);
  return data;
};

export const updateCommand = async (command: ICreateCommand, id: number) => {
  const { data } = await AxiosServices.put(`api/Command/${id}`, command);
  console.log(data);
  
  return data;
};

export const deleteCommand = async (id: number) => {
  const { data } = await AxiosServices.delete(`api/Command/${id}`);
  return data;
};

export const getCommandById = async (id: number) => {
  const { data } = await AxiosServices.get(`api/Command/${id}`);
  return data as ICommand;
};

export const CommandsService = {
  getCommandsByTable: async (id: number) => {
    const { data } = await AxiosServices.get(`api/Command/table/${id}`);
    console.log(data);
    return data as ICommand;
  },
};
