import { ITableGet } from "@/interfaces";
import { AxiosServices } from "..";
import { ITableGetCommand } from '../../interfaces/ITable/index';

export const TablesService = {
  getTables: async () => {
    const { data } = await AxiosServices.get("api/table");
    return data as ITableGetCommand[];
  },
};
