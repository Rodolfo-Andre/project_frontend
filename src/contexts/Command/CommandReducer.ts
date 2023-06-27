import { IActionDish, IStateDish } from "@/interfaces/ICommand/ICommandCOntext";

export const initialStateCommand: IStateDish = {
  data: {
    listDish: [],
    listCategory: [],
    selectedCategory: "",
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
    isEdit: false,
  },
  error: {
    hasError: false,
    message: "",
  },
  modal: {
    open: false,
    selectDish: null,
  },
  modalVocher: false,
  valuesVocher: {
    cliente: {
      name: "",
      lastName: "",
      dni: "",
    },
    values: {
      ListPayment: [],
      valTypePayment: "",
      valAmount: 0,
      valTypeVoucher: "",
      descount: 0,
      subtotal: 0,
      igv: 0,
      total: 0,
    },
  
  },
  errorsVocher: {
    dni:  false,
    valAmount:  false,
    valDescount:  false,
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
          ...action.payload,
        },
      };

    case "RESET_VALUES_DISH":
      return {
        ...state,
        valuesDish: {
          quantity: 0,
          observation: "",
          isEdit: false,
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
          selectDish: action.payload.selectDish,
        },
      };

    case "SET_MODAL_VOCHER":
      return {
        ...state,
        modalVocher: action.payload,
      };

    case "SET_VALUES_VOCHER_CLIENTE":
      return {
        ...state,
        valuesVocher: {
          ...state.valuesVocher,
          cliente: {
            ...state.valuesVocher.cliente,
            name: action.payload.name,
            lastName: action.payload.lastName,
            dni: action.payload.dni,
          },
        },
      };

     case "SET_VALUES_VOCHER": {
        return {
          ...state,
          valuesVocher: {
            ...state.valuesVocher,
            values: {
              ...state.valuesVocher.values,
              ...action.payload,
            },
          },
        };
      }

    case "SET_ERRORS_VOCHER":
      return {
        ...state,
        errorsVocher: {
          dni: action.payload.dni,
          valAmount: action.payload.valAmount,
          valDescount: action.payload.valDescount,
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
