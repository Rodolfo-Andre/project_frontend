import { ICategoryDishGet } from "../ICategoryDish";
import { IDishGet } from "../IDish";
import { ITableWithComand2 } from "../ITable";

export interface IStateDish {
    data: {
      listDish: IDishGet[];
      listCategory: ICategoryDishGet[];
      listDishViewAndPost: IDishView[];
      selectedCategory: string;
      valSelectCategory: string;
      valSelectDish: string;
    };
    values: {
      cantPerson: number;
      total: number;
    };
    valuesDish: {
      quantity: number;
      observation: string;
    };
    error: {
      hasError: boolean;
      message: string;
    };
    modal : {
      open : boolean;
      selectDish : IDishView | null;
    }
  }
  
  
  
  export interface IDishView extends IDishGet {
    quantity: number;
    observation: string;
    total: number;
  }
  export type IActionDish =
    | {
        type: "SET_LIST_DISH";
        payload: IDishGet[];
      }
    | {
        type: "SET_LIST_CATEGORY";
        payload: ICategoryDishGet[];
      }
    | {
        type: "SET_SELECT_DISH";
        payload: IDishView | null;
      }
    | {
        type: "SET_LIST_DISH_VIEW_AND_POST";
        payload: IDishView[];
      }
    | {
        type: "SET_SELECTED_CATEGORY";
        payload: string;
      }
    | {
        type: "SET_VAL_SELECT_CATEGORY";
        payload: string;
      }
    | {
        type: "SET_VAL_SELECT_DISH";
        payload: string;
      }
    | {
        type: "SET_VALUES";
        payload: {
          cantPerson: number;
          total: number;
        };
      }
    | {
        type: "SET_VALUES_DISH";
        payload: {
          quantity: number;
          observation: string;
        };
      }
    | {
        type: "RESET_VALUES_DISH";
      }
    | {
        type: "RESET_VALUES";
      }
    | {
        type: "SET_ERROR";
        payload: {
          hasError: boolean;
          message: string;
        };
      }
    | {
        type: "RESET_ERROR";
      } 
    |  {
        type: "SET_MODAL";
        payload: {
          open : boolean;
          selectDish : IDishView | null;
        };
      }
      

    
