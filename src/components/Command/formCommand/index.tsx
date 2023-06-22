import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { InputForm } from "@/components/InputForm";
import { ITableWithComand2 } from "@/interfaces";
import { CommandContext } from "@/contexts/Command";
import { AuthContext } from "@/contexts";



interface IFormCommand {
  data: ITableWithComand2;
}
const FormCommand: React.FC<IFormCommand> = ({ data }) => {
  const { state, dispatch, saveCommand, deleteCommand,stateLoading } =
    useContext(CommandContext);
  const { user } = useContext(AuthContext);

  return (
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: "100%",
          padding: 2,
        }}
      >
        {data.id !== 0 && (
          <InputForm
            Icon={<Grid3x3OutlinedIcon color="primary" />}
            id="id-commmand"
            label="Id de la comanda"
            value={data.id || ""}
            disabled={true}
            type="number"
            onChange={() => {}}
            isErrored={false}
            errorText=""
          />
        )}

        <InputForm
          Icon={<TableRestaurantIcon color="primary" />}
          id="number-table"
          label="Numero de mesa"
          value={data.numTable || ""}
          disabled={true}
          type="number"
          onChange={() => {}}
          isErrored={false}
          errorText=""
        />

        <InputForm
          Icon={<PeopleAltIcon color="primary" />}
          id="cant-personas"
          label="Cantidad de personas"
          type="number"
          value={data.cantSeats === 0 ? state.values.cantPerson : data.cantSeats}
          onChange={(ev) => {
            dispatch({
              type: "SET_VALUES",
              payload: {
                ...state.values,
                cantPerson: Number(ev.target.value),
              },
            });
          }}
          isErrored={false}
          errorText=""
        />

        <InputForm
          Icon={<SmartScreenIcon color="primary" />}
          id="state-commmand"
          label="Estado de la comanda"
          disabled={true}
          value={data.statesCommandName || ""}
          type="string"
          onChange={() => {}}
          isErrored={false}
          errorText=""
        />

        <InputForm
          Icon={<AssignmentIndIcon color="primary" />}
          id="employee-commmand"
          label="Empleado"
          value={user?.firstName + " " + user?.lastName || ""}
          disabled={true}
          type="string"
          onChange={() => {}}
          isErrored={false}
          errorText=""
        />

        <InputForm
          Icon={<PriceChangeIcon color="primary" />}
          id="total-commmand"
          label="Total"
          value={state.values.total || 0}
          disabled={true}
          type="number"
          onChange={() => {}}
          isErrored={false}
          errorText=""
        />

        <Grid sx={{ marginTop: 2 }} width={"100%"} container gap={1}>
            {
              data.id !== 0 && data.statesCommandId === 2 && (
                <Grid item xs={12} sm={12} md={3}>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch({type : "SET_MODAL_VOCHER",payload : true})
                  }}
                  fullWidth
                  sx={{ bgcolor: "#6f42c1" }}
                >
                  Facturar
                </Button>
              </Grid>
              )
            }
             
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              color="success"
              onClick={ () => {
                saveCommand({
                  cantPerson: state.values.cantPerson,
                  userId: user?.id || 0,
                  id: data.id,
                  numTable: data.numTable,
                });
              }}
              fullWidth
               
            >
              {data.id ? "Actualizar" : "Guardar"}
            </Button>
          </Grid>

          {data.id !== 0  && (
            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                color="error"
                onClick={
                  () => {
                    deleteCommand(data.id);
                  }
                }
                disabled={stateLoading}
                fullWidth
              >
                Eliminar
              </Button>
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                window.location.href = "/commands";
              }}
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default FormCommand;
