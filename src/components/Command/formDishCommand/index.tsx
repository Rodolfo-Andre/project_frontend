import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import { InputForm } from "@/components/InputForm";
import {useContext,useEffect} from 'react';
import { CommandContext } from "@/contexts/Command";
import { ramdonKey } from "@/utils";
import Box from '@mui/material/Box';
import CardCommandComponent from "../CardCommand";

const FormDishCommand = () => {

const {state,handleAddDish,dispatch,handleDeleteDish,stateLoading} = useContext(CommandContext)


  return (
    <Grid 
    item xs={12} md={6}
    sx={{  height: "100%", padding: 2 ,
    borderLeft: "1px solid #E0E0E0",
     }}>
      <FormControl sx={{ marginBottom: 2 }} fullWidth>
        <InputLabel id="lbl-category">Categoria</InputLabel>
        <Select
          labelId="lbl-category"
          id="id-category"
          value={state.data.valSelectCategory}
          label="Categoria"
          disabled={stateLoading}
          onChange={(e) => {
            dispatch({type:'SET_SELECTED_CATEGORY',payload:e.target.value})
            dispatch({type:'SET_VAL_SELECT_CATEGORY',payload:e.target.value})
            dispatch({type:'SET_VAL_SELECT_DISH',payload: ""})
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
            dispatch({type:'SET_VAL_SELECT_DISH',payload:e.target.value})
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
        onChange={(event) => {
          dispatch({type:'SET_VALUES_DISH',payload: {
            ...state.valuesDish,
            quantity: Number(event.target.value),
          }})
        }}
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
            dispatch({type:'SET_VALUES_DISH',payload: {
              ...state.valuesDish,
              observation: event.target.value,
            }})
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

      <Box
        sx={{
          marginTop: 2,
          padding: 1,
          background: "#F5F5F5",
          borderRadius: 5,
          overflowY: "auto",
          height: "300px",
        }}
      >
        {state.data.listDishViewAndPost.map((item, index) => (
          <CardCommandComponent
            key={ramdonKey("card-dish")}
            data={item}
            handleRemove={handleDeleteDish}
            showModal={() => {
               dispatch({type:'SET_MODAL',payload: {
                    open: true,
                    selectDish: item,
                }})
            }}
          />
        ))}
     
      </Box>
    </Grid> 
  )
}

export default FormDishCommand