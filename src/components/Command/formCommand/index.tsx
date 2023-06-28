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
import { ITableWithComand2, UserRoles } from "@/interfaces";
import { CommandContext } from "@/contexts/Command";
import { AuthContext } from "@/contexts";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import axiosObject from "@/services/Axios";
import { AlertMessage } from "@/utils";

interface IFormCommand {
  data: ITableWithComand2;
}
const FormCommand: React.FC<IFormCommand> = ({ data }) => {
  const { push } = useRouter();

  const { state, dispatch, saveCommand, deleteCommand, stateLoading } =
    useContext(CommandContext);
  const { user } = useContext(AuthContext);

  const onChangeCantPerson = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.target.value);

    if (value < 0 || isNaN(value) || value === null || value === undefined) {
      dispatch({
        type: "SET_VALUES",
        payload: {
          ...state.values,
          cantPerson: 0,
        },
      });

      return;
    }

    if (value > 15) {
      dispatch({
        type: "SET_VALUES",
        payload: {
          ...state.values,
          cantPerson: 15,
        },
      });
      return;
    }

    dispatch({
      type: "SET_VALUES",
      payload: {
        ...state.values,
        cantPerson: Math.round(value),
      },
    });
  };

  const updateState = () => {
    if (data === null) {
      return;
    }

    axiosObject
      .put(`/api/command/update-state/${data?.id}`)
      .then((response) => {
        if (response.status === 200) {
          AlertMessage(
            "Exito!",
            "Se actualizo el estado de la comanda",
            "success"
          ).then(() => {
            push("/commands");
          });
        }
      })
      .catch((error) => {
        AlertMessage(
          "Error!",
          "No se pudo actualizar el estado de la comanda",
          "error"
        ).then(() => {
          push("/commands");
        });
      });
  };

  const getStateCommandName = (state: number) => {
    switch (state) {
      case 1:
        return "Generado";
      case 2:
        return "Preparado";
      case 3:
        return "Pagado";
      default:
        return "Generado";
    }
  };

  const onlyAdministradorMesero = (
    ["Administrador", "Mesero"] as UserRoles[]
  ).includes(user?.role.roleName as UserRoles);
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
        value={state.values.cantPerson}
        disabled={!onlyAdministradorMesero}
        onChange={onChangeCantPerson}
        isErrored={false}
        errorText=""
      />

      <InputForm
        Icon={<SmartScreenIcon color="primary" />}
        id="state-commmand"
        label="Estado de la comanda"
        disabled={true}
        value={getStateCommandName(data.statesCommandId) || ""}
        type="string"
        onChange={() => {}}
        isErrored={false}
        errorText=""
      />

      <InputForm
        Icon={<AssignmentIndIcon color="primary" />}
        id="employee-commmand"
        label="Empleado"
        value={
          data.employeeName.length > 0
            ? data.employeeName
            : user?.firstName + " " + user?.lastName
        }
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
        {data.id !== 0 &&
          data.statesCommandId === 2 &&
          (["Administrador", "Cajero"] as UserRoles[]).includes(
            user?.role.roleName as UserRoles
          ) && (
            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch({ type: "SET_MODAL_VOCHER", payload: true });
                }}
                fullWidth
                color={"secondary"}
              >
                Facturar
              </Button>
            </Grid>
          )}

        {data.id !== 0 &&
          data.statesCommandId === 1 &&
          (["Administrador", "Cocinero"] as UserRoles[]).includes(
            user?.role.roleName as UserRoles
          ) && (
            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                onClick={() => {
                  updateState();
                }}
                fullWidth
                color={"secondary"}
              >
                Actualizar estado
              </Button>
            </Grid>
          )}

        {onlyAdministradorMesero && (
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
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
        )}

        {data.id !== 0 && onlyAdministradorMesero && (
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteCommand(data.id);
              }}
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
              push("/commands");
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
