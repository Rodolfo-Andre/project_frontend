import { IActionDish, IStateDish } from "@/interfaces/ICommand/ICommandCOntext";

export const initialStateCommand: IStateDish = {
    data: {
      listDish: [],
      listCategory: [],
      selectedCategory:  "",
      valSelectCategory: "",
      valSelectDish: "",
      listDishViewAndPost: [],
    },
    values: {
      cantPerson: 0,
      total: 0,
    },
    valuesDish: {
      quantity: 0,
      observation: "",
    },
    error: {
      hasError: false,
      message: "",
    },
    modal : {
      open : false,
      selectDish : null
    }
  };
  
  
 export const stateReducer = (state: IStateDish, action: IActionDish) => {
    switch (action.type) {
      case "SET_LIST_DISH":
        return {
          ...state,
          data: {
            ...state.data,
            listDish: action.payload,
          },
        };
      case "SET_LIST_CATEGORY":
        return {
          ...state,
          data: {
            ...state.data,
            listCategory: action.payload,
          },
        };
      case "SET_SELECT_DISH":
        return {
          ...state,
          data: {
            ...state.data,
            selectDish: action.payload,
          },
        };
      case "SET_LIST_DISH_VIEW_AND_POST":
        return {
          ...state,
          data: {
            ...state.data,
            listDishViewAndPost: action.payload,
          },
        };
  
      case "SET_SELECTED_CATEGORY":
        return {
          ...state,
          data: {
            ...state.data,
            selectedCategory: action.payload,
          },
        };
      case "SET_VAL_SELECT_CATEGORY":
        return {
          ...state,
          data: {
            ...state.data,
            valSelectCategory: action.payload,
          },
        };
      case "SET_VAL_SELECT_DISH":
        return {
          ...state,
          data: {
            ...state.data,
            valSelectDish: action.payload,
          },
        };
      case "SET_VALUES":
        return {
          ...state,
          values: {
            ...state.values,
            cantPerson: action.payload.cantPerson,
            total: action.payload.total,
          },
        };
      case "SET_VALUES_DISH":
        return {
          ...state,
          valuesDish: {
            ...state.valuesDish,
            quantity: action.payload.quantity,
            observation: action.payload.observation,
          },
        };
  
      case "RESET_VALUES_DISH":
        return {
          ...state,
          valuesDish: {
            quantity: 0,
            observation: "",
          },
        };
      case "RESET_VALUES":
        return {
          ...state,
          values: {
            cantPerson: 0,
            total: 0,
          },
        };
      case "SET_ERROR":
        return {
          ...state,
          error: {
            hasError: action.payload.hasError,
            message: action.payload.message,
          },
        };
      case "RESET_ERROR":
        return {
          ...state,
          error: {
            hasError: false,
            message: "",
          },
        };

      case "SET_MODAL":
        return {
          ...state,
          modal: {
            ...state.modal,
            open: action.payload.open,
            selectDish: action.payload.selectDish
          },
        };


      // case "SET_LOADING":
      //   return {
      //     ...state,
      //     loading: action.payload,
      //   };
      // case "SET_LOADING_DISABLE":
        // return {
        //   ...state,
        //   loadingDisable: action.payload,
        // };
      default:
        return state;
    }
  };