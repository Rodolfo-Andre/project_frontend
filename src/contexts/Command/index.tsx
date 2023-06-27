import {
  initialStateCommand,
  stateReducer,
} from "@/contexts/Command/CommandReducer";
import { ICategoryDishGet, IDishGet, ITableWithComand2 } from "@/interfaces";
import {
  IActionDish,
  IDishView,
  IStateDish,
} from "@/interfaces/ICommand/ICommandCOntext";
import axiosObject from "@/services/Axios";
import CommandServices from "@/services/apis/command-services";
import { AlertMessage } from "@/utils";

import {
  ReactNode,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import ServiceDish from "@/services/apis/dish-services";
const CommandContext = createContext({
  state: {} as IStateDish,
  setListDish: (listDish: IDishGet[]) => {},
  setListCategory: (listCategory: ICategoryDishGet[]) => {},
  dispatch: (d: IActionDish) => {},
  handleAddDish: () => {},
  handleEditDish: (id: string) => {},
  handleDeleteDish: (id: string) => {},
  updateTotal: () => {},
  resetError: () => {},
  setError: (message: string) => {},
  handleUpdateDish: (quantity: number, observation: string) => {},
  loading: false,
  stateLoading: false,
  saveCommand: (data: {
    id: number;
    numTable: number;
    cantPerson: number;
    userId: number;
  }) => {},
  data: {} as ITableWithComand2 | null,
  loadCommand: async (id: number) => {},
  deleteCommand: (id: number) => {},
  setIdTable: (id: number) => {},
  idTable: 0,
  calculateTotal: () => {},
  addPayment: (numero: number) => {},

});

const CommandProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ITableWithComand2 | null>(null);
  const [state, dispatch] = useReducer(stateReducer, initialStateCommand);
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [idTable, setIdTable] = useState(0);

  useEffect(() => {
    if (idTable !== 0) {
      console.log("idTable", idTable);
      loadCommand();
    }
  }, [idTable]);

  useEffect(() => {
    if (state.data.selectedCategory !== "") {
      getDishesByCategory(state.data.selectedCategory);
    }

    console.log("state.data.selectedCategory", state.data.selectedCategory);
    
  }, [state.data.selectedCategory]);

  useEffect(() => {
    updateTotal();
  }, [state.data.listDishViewAndPost]);

  const setListDish = (listDish: IDishGet[]) => {
    dispatch({
      type: "SET_LIST_DISH",
      payload: listDish,
    });
  };

  const setListCategory = (listCategory: ICategoryDishGet[]) => {
    dispatch({
      type: "SET_LIST_CATEGORY",
      payload: listCategory,
    });
  };

  const handleAddDish = () => {
    if (state.data.valSelectCategory === "") return;
    if (state.data.valSelectDish === "") return;
    const dish = state.data.listDish.find(
      (item) => item.id === state.data.valSelectDish
    );

    if (dish) {
     
        const exitsDish = state.data.listDishViewAndPost.find( item => item.id === dish.id);

        if (exitsDish) {
          AlertMessage("Error", "El plato ya se encuentra agregado","error");
          return;
        }
  
        if (state.valuesDish.quantity === 0) {
             AlertMessage("Error", "Ingrese una cantidad","error");
             return;
          }
          const newDishView: IDishView = {
            ...dish,
            quantity: state.valuesDish.quantity,
            observation: state.valuesDish.observation,
            total: state.valuesDish.quantity * dish.priceDish,
          };
          dispatch({
            type: "SET_LIST_DISH_VIEW_AND_POST",
            payload: [...state.data.listDishViewAndPost, newDishView],
          });


    }

    dispatch({
      type: "RESET_VALUES_DISH",
    });
    dispatch({
      type : "SET_VAL_SELECT_DISH",
      payload : "" 
    })

  };




  const handleEditDish = (id: string) => {
    const dish = state.data.listDishViewAndPost.find((item) => item.id === id);

    if (dish) {
    dispatch({
      type : "SET_MODAL",
      payload : {
        open : true,
        selectDish : dish,
      }
    })

      dispatch({
        type: "SET_VALUES_DISH",
        payload : {
          ...state.valuesDish,
          isEdit : true,
        }
      });
    }

  };

  const handleUpdateDish = (
    quantity: number, observation: string
  ) => {

    const exist = state.data.listDishViewAndPost.find( item => item.id === state.modal.selectDish?.id);

    if (exist) {

      const newListDishViewAndPost = state.data.listDishViewAndPost.map( item => {
        if (item.id === state.modal.selectDish?.id) {
          return {
            ...item,
            quantity : quantity,
            observation : observation,
            total : quantity * item.priceDish,
          }
        }
        return item;
      })

      dispatch({
        type: "SET_LIST_DISH_VIEW_AND_POST",
        payload: newListDishViewAndPost,
      });

      dispatch({
        type : "SET_MODAL",
        payload : {
          open : false,
          selectDish : null,
        }
      })

    }

  }

  const handleDeleteDish = (id: string) => {
    const newListDishViewAndPost = state.data.listDishViewAndPost.filter(
      (item) => item.id !== id
    );

    dispatch({
      type: "SET_LIST_DISH_VIEW_AND_POST",
      payload: newListDishViewAndPost,
    });
  };

  const updateTotal = () => {
    const total = state.data.listDishViewAndPost.reduce(
      (acc, item) => acc + item.total,
      0
    );

    dispatch({
      type: "SET_VALUES",
      payload: {
        ...state.values,
        total: total,
      },
    });
  };

  const resetError = () => {
    dispatch({
      type: "RESET_ERROR",
    });
  };
  const setError = (message: string) => {
    dispatch({
      type: "SET_ERROR",
      payload: {
        hasError: true,
        message,
      },
    });
  };

  const saveCommand = async (res: {
    id: number;
    numTable: number;
    cantPerson: number;
    userId: number;
  }) => {
    const validCantPerson = state.values.cantPerson > 0;
    const validateListDish = state.data.listDishViewAndPost.length > 0;

    if (!data) return


    if (res.cantPerson > data.numSeats ) {

      AlertMessage(
        "Error!",
        "La cantidad de mesas no puede ser menor a la cantidad de personas. mesa: " + data.numSeats + " personas: " + res.cantPerson,
        "error"
      ).then(() => {});
      return;

    }


    if (!validateListDish) {
      AlertMessage(
        "Error!",
        "Debe agregar al menos un plato a la comanda",
        "error"
      ).then(() => {});
      return;
    }
    if (!validCantPerson) {
      AlertMessage(
        "Error!",
        "La cantidad de personas debe ser mayor a 0",
        "error"
      ).then(() => {});
      return;
    }

    const listDishPost = state.data.listDishViewAndPost.map((x) => {
      return {
        dishId: x.id,
        quantity: x.quantity,
        observation: x.observation,
      };
    });
    const objectPost = {
      id: res.id,
      numTable: res.numTable,
      cantPerson: res.cantPerson,
      employeeId: res.userId,
      total: state.values.total,
      listDish: listDishPost,
    };

    setStateLoading(true);
    try {
      const data = await CommandServices.saveCommand(objectPost);

      if (data) {
        AlertMessage("Exito!", "Se guardo la comanda", "success").then(() => {

          window.location.href = "/commands";
        });
      }
    } catch (error) {
      AlertMessage("Error!", "No se pudo guardar la comanda", "error").then(
        () => {}
      );
    } finally {
      setStateLoading(false);
    }
  };

  const deleteCommand = async (id: number) => {
    setStateLoading(true);
    try {
      const mesage = await CommandServices.deleteCommand(id);
      console.log(mesage);

      AlertMessage("Exito!", "Se elimino la comanda", "success").then(() => {
        window.location.href = "/commands";
      });
    } catch (error) {
      AlertMessage("Error!", "No se pudo eliminar la comanda", "error").then(
        () => {}
      );
    } finally {
      setStateLoading(false);
    }
  };

  const loadCommand = async () => {
    setLoading(true);
    try {
      const { data } = await axiosObject.get<ITableWithComand2>(
        `api/command/getCommandByTableId/${idTable}`
      );
      const dataCategoryDish = await ServiceDish.getCategoryDish();
      setData(data);
      const listado = data.detailsComand.map((item) => {
        return {
          categoryDish: {
            id: item.dish.categoryDishId,
            nameCatDish: item.dish.categoryDishName,
          },
          id: item.dish.id,
          imgDish: item.dish.imgDish,
          nameDish: item.dish.nameDish,
          observation: item.observation,
          priceDish: item.dish.priceDish,
          quantity: item.cantDish,
          total: item.dish.priceDish * item.cantDish,
        } as IDishView;
      });

      dispatch({
        type: "SET_LIST_DISH_VIEW_AND_POST",
        payload: listado,
      });


      dispatch({
        type : "SET_VALUES",
        payload : {
          ...state.values,
          cantPerson : data.cantSeats,
        }
      })


      dispatch({
        type: "SET_LIST_CATEGORY",
        payload: dataCategoryDish,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getDishesByCategory = async (id: string) => {
    setStateLoading(true);
    try {
      const { getDishes } = ServiceDish;
      const data = await getDishes(id);

      dispatch({
        type: "SET_LIST_DISH",
        payload: data,
      });
    } catch (error) {
      AlertMessage("Error!", "No se pudo cargar los platos", "error");
    } finally {
      setStateLoading(false);
    }
  };

  const calculateTotal = () => {
     const subtotal = state.data.listDishViewAndPost.reduce( 
      (acc, item) => acc + item.total, 0
    );

    const igv = subtotal * 0.18;
    let total = subtotal + igv;

    if (state.valuesVocher.values.descount > 0) {
      total = total -  state.valuesVocher.values.descount;
    }

    const mountVoucher = state.valuesVocher.values.ListPayment.reduce(
      (acc, item) => acc + item.amount, 0
    )

    total = total - mountVoucher;

    dispatch({
      type: "SET_VALUES_VOCHER",
      payload: {
        ...state.valuesVocher.values,
        subtotal,
        igv,
        total,
      },
    });


  };

  const  addPayment =  (numero:number) => {
    
    if (state.valuesVocher.values.valTypePayment === "") {
      AlertMessage("Error!", "Debe seleccionar un tipo de pago", "error");
      return;
    }

    if (numero <= 0) {
      AlertMessage("Error!", "El monto debe ser mayor a 0", "error");
      return;
    }

    const listPayment = state.valuesVocher.values.ListPayment;
    const newPayment = {
      id:  listPayment.find(x => x.id === Number(state.valuesVocher.values.valTypePayment))?.id ?? 0,
      amount: numero,
      typePayment: state.valuesVocher.values.valTypePayment,
      name : listPayment.find(x => x.id === Number(state.valuesVocher.values.valTypePayment))?.name ?? ""
    };

    const newListPayment = [...listPayment, newPayment];

    dispatch({
      type: "SET_VALUES_VOCHER",
      payload: {
        ...state.valuesVocher.values,
        ListPayment: newListPayment,
        valAmount: 0,
        valTypePayment: "",
      },
    });

    

    calculateTotal();
  }

  return (
    <CommandContext.Provider
      value={{
        handleUpdateDish,
        data,
        state,
        setListDish,
        setListCategory,
        dispatch,
        handleEditDish,
        handleAddDish,
        handleDeleteDish,
        updateTotal,
        resetError,
        saveCommand,
        setError,
        deleteCommand,
        loadCommand,
        loading,
        stateLoading,
        setIdTable,
        calculateTotal,
        addPayment,
        idTable,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export { CommandContext, CommandProvider };
