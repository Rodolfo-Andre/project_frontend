import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import { InputForm } from "@/components/InputForm";
import React, { useContext, useState } from "react";
import { CommandContext } from "@/contexts/Command";
import { ramdonKey } from "@/utils";
import Box from "@mui/material/Box";
import CardCommandComponent from "../CardCommand";
import { ICategoryDishGet, UserRoles } from "@/interfaces";
import { AuthContext } from "@/contexts";

// interface IDishForm {
//    category: ICategoryDishGet;
// }

const FormDishCommand = () => {
  const {
    state,
    handleAddDish,
    dispatch,
    handleDeleteDish,
    stateLoading,
    handleEditDish,
  } = useContext(CommandContext);
  const { user } = useContext(AuthContext);
  const OnlyAdministradorOrMesero = (
    ["Administrador", "Mesero"] as UserRoles[]
  ).includes(user?.role.roleName as UserRoles);

  const onchangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let value = Number(event.target.value);

    if (isNaN(value) || value === null || value === undefined) {
      state.valuesDish.quantity = 0;
    }

    if (value < 0) {
      state.valuesDish.quantity = 0;
    }

    if (value >= 1 && value <= 15) {
      dispatch({
        type: "SET_VALUES_DISH",
        payload: { ...state.valuesDish, quantity: Math.round(value) },
      });
    }
  };

  const ListDish = React.useMemo(() => {
    return (
      <Box
        sx={{
          marginTop: OnlyAdministradorOrMesero ? 5 : 0,
          padding: 1,
          background: "#F5F5F5",
          borderRadius: 5,
          overflowY: "auto",
          height: "300px",
        }}
      >
        {state.data.listDishViewAndPost.map((item, index) => {
          return (
            <CardCommandComponent
              key={ramdonKey("card-dish")}
              data={item}
              handleRemove={handleDeleteDish}
              showModal={() => {
                dispatch({
                  type: "SET_MODAL",
                  payload: {
                    open: true,
                    selectDish: item,
                  },
                });
              }}
              handleEdit={handleEditDish}
            />
          );
        })}
      </Box>
    );
  }, [state.data.listDishViewAndPost]);

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{ height: "inherit", padding: 2, borderLeft: "1px solid #E0E0E0" }}
    >
      {OnlyAdministradorOrMesero && (
        <>
          <FormControl sx={{ marginBottom: 2 }} fullWidth>
            <InputLabel id="lbl-category">Categoria</InputLabel>
            <Select
              labelId="lbl-category"
              id="id-category"
              value={state.data.valSelectCategory}
              label="Categoria"
              disabled={stateLoading}
              onChange={(e) => {
                dispatch({
                  type: "SET_SELECTED_CATEGORY",
                  payload: e.target.value,
                });
                dispatch({
                  type: "SET_VAL_SELECT_CATEGORY",
                  payload: e.target.value,
                });
                dispatch({ type: "SET_VAL_SELECT_DISH", payload: "" });
              }}
            >
              {state.data.listCategory.map((item, index) => (
                <MenuItem key={ramdonKey("catDish")} value={item.id}>
                  {item.nameCatDish}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginBottom: 2 }} fullWidth>
            <InputLabel id="lbl-dish">Platos</InputLabel>
            <Select
              labelId="lbl-dish"
              id="id-dish"
              value={state.data.valSelectDish}
              label="Platos"
              disabled={stateLoading}
              onChange={(e) => {
                dispatch({
                  type: "SET_VAL_SELECT_DISH",
                  payload: e.target.value,
                });
              }}
            >
              {state.data.listDish.map((item, index) => (
                <MenuItem key={ramdonKey("dish")} value={item.id}>
                  {item.nameDish}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputForm
            Icon={<ProductionQuantityLimitsIcon color="primary" />}
            id="quantity-dish"
            label="Cantidad"
            value={state.valuesDish.quantity}
            type="number"
            onChange={onchangeQuantity}
            isErrored={false}
            errorText={""}
          />
          <InputForm
            Icon={<ChromeReaderModeIcon color="primary" />}
            id="observation-dish"
            label="Observacion"
            value={state.valuesDish.observation}
            type="string"
            onChange={(event) => {
              if (event.target.value.length <= 50) {
                dispatch({
                  type: "SET_VALUES_DISH",
                  payload: {
                    ...state.valuesDish,
                    observation: event.target.value,
                  },
                });
              }
            }}
            isErrored={false}
            errorText=""
          />

          <Button
            fullWidth
            disabled={stateLoading}
            variant="contained"
            color="primary"
            onClick={handleAddDish}
          >
            Agregar
          </Button>
        </>
      )}

      {ListDish}
    </Grid>
  );
};

export default FormDishCommand;
