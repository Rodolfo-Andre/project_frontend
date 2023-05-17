import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FormDialogDelete from "@/components/FormDialogDelete";
import DataTable from "@/components/DataTable";
import EmployeeUpdateForm from "@/features/Employee/EmployeeUpdateForm";
import dayjs from "dayjs";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridValueGetterParams,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { IEmployeeGet } from "@/interfaces";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/HttpRequests";
import { handleLastPageDeletion } from "@/utils";
import useSWR, { useSWRConfig } from "swr";
import { AuthContext } from "@/contexts/Auth";

const EmployeeTable = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useSWR("api/employee", () =>
    fetchAll<IEmployeeGet>("api/employee")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeGet | null>(
    null
  );
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "Nombres", width: 200 },
    { field: "lastName", headerName: "Apellidos", width: 200 },
    {
      field: "role",
      headerName: "Rol",
      type: "singleSelect",
      width: 100,
      valueGetter: (params: GridValueGetterParams<IEmployeeGet>) =>
        params.row.role.roleName,
      valueOptions: [
        ...new Set(data?.map((employee) => employee.role.roleName)),
      ],
    },
    { field: "phone", headerName: "Teléfono", width: 100 },
    {
      field: "email",
      headerName: "Correo Electrónico",
      width: 200,
      valueGetter: (params: GridValueGetterParams<IEmployeeGet>) =>
        params.row.user.email,
    },
    {
      field: "createdAt",
      headerName: "Creado en",
      type: "dateTime",
      width: 200,
      valueGetter: (params: GridValueGetterParams<IEmployeeGet>) =>
        dayjs(params.row.createdAt).toDate(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (employee: GridRowParams<IEmployeeGet>) => {
        const gridCells = [
          <GridActionsCellItem
            key={employee.row.id}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={() => {
              setSelectedEmployee(employee.row);
              openDialogUpdate();
            }}
          />,
        ];

        if (user?.id !== employee.row.id) {
          gridCells.push(
            <GridActionsCellItem
              key={employee.row.id}
              icon={<Delete />}
              label="Delete"
              color="error"
              onClick={() => {
                setSelectedEmployee(employee.row);
                openDialogDelete();
              }}
            />
          );
        }

        return gridCells;
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        loading={isLoading}
        rows={data}
        apiRef={gridApiRef}
      />

      <FormDialogDelete
        title={`¿Estás seguro de eliminar el empleado "${selectedEmployee?.firstName} ${selectedEmployee?.lastName}"?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/employee/${selectedEmployee?.id}`);
          handleLastPageDeletion(gridApiRef, data!.length);
          mutate("api/employee");
          closeDialogDelete();
          handleOpen("El empleado se ha eliminado correctamente");
          setSelectedEmployee(null);
        }}
      />

      {openDialogU && (
        <EmployeeUpdateForm
          setSelectedEmployee={setSelectedEmployee}
          open={openDialogU}
          closeDialog={() => {
            closeDialogUpdate();
          }}
          employee={selectedEmployee!}
        />
      )}
    </>
  );
};

export default EmployeeTable;
