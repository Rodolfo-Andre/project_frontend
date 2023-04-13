import { IEmployeeGet } from "@/interfaces/IEmployee";
import { Edit, Delete } from "@mui/icons-material";
import {
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid";
import { FormDialogDelete, EmployeeUpdateForm, DataTable } from "@/components";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/HttpRequests";
import useSWR, { useSWRConfig } from "swr";
import dayjs from "dayjs";

const EmployeeTable = () => {
  const { data, isLoading } = useSWR("api/employees", () =>
    fetchAll<IEmployeeGet>("api/employees")
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
        return [
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
          <GridActionsCellItem
            key={employee.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={() => {
              setSelectedEmployee(employee.row);
              openDialogDelete();
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} loading={isLoading} rows={data} />

      <FormDialogDelete
        title={`¿Estás seguro de eliminar al empleado ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/employees/${selectedEmployee?.id}`);
          mutate("api/employees");
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
