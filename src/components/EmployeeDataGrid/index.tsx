import { IEmployeeGet } from "@/interfaces/IEmployee";
import { Edit, Delete } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  DataGrid,
  GridRowParams,
} from "@mui/x-data-grid";
import { FormDialogDelete, EmployeeUpdateForm } from "@/components";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/Employee";
import useSWR, { useSWRConfig } from "swr";
import dayjs from "dayjs";

const EmployeeDataGrid = () => {
  const { data } = useSWR("api/employees", () =>
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
      <Box sx={{ display: "flex", marginY: 2 }}>
        <DataGrid
          sx={{ width: 100 }}
          rows={data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
        />
      </Box>

      <FormDialogDelete
        title={`¿Estás seguro de eliminar al empleado ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/employees/${selectedEmployee?.id}`);
          setSelectedEmployee(null);
          closeDialogDelete();
          mutate("api/employees");
          handleOpen("El empleado se ha eliminado correctamente");
        }}
      />

      {openDialogU && (
        <EmployeeUpdateForm
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

export default EmployeeDataGrid;
