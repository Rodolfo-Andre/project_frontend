import { ICategoryDishGet } from "../ICategoryDish";
import { IDishGet } from "../IDish";
import { ITableWithComand2 } from "../ITable";

type IlistTypeCash ={
  id: number;
  amount: number;
  typePayment: string;
  name: string;
}

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
    isEdit: boolean;
  };
  error: {
    hasError: boolean;
    message: string;
  };
  modal: {
    open: boolean;
    selectDish: IDishView | null;
  };
  modalVocher: boolean;
  valuesVocher: {
    cliente: {
      name: string;
      lastName: string;
      dni: string;
    };
    values: {
      ListPayment: IlistTypeCash[];
      valTypePayment: string;
      valAmount: number;
      valTypeVoucher: string;
      descount: number;
      subtotal: number;
      igv: number;
      total: number;
    };
  };
  errorsVocher: {
    dni: boolean;
    valAmount: boolean;
    valDescount: boolean;
  };
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
        isEdit: boolean;
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
  | {
      type: "SET_MODAL";
      payload: {
        open: boolean;
        selectDish: IDishView | null;
      };
    }
  | {
      type: "SET_MODAL_VOCHER";
      payload: boolean;
    }
  | {
      type: "SET_VALUES_VOCHER";
      payload: {
        ListPayment:  IlistTypeCash[];
        valTypePayment: string;
        valAmount: number;
        valTypeVoucher: string;
        subtotal: number;
        descount: number;
        igv: number;
        total: number;
      };
    }
  | {
      type: "SET_VALUES_VOCHER_CLIENTE";
      payload: {
        name: string;
        lastName: string;
        dni: string;
      };
    }
  | {
      type: "SET_ERRORS_VOCHER";
      payload: {
        dni: boolean;
        valAmount: boolean;
        valDescount: boolean;
      };
    }
    

