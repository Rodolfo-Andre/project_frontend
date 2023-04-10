import { IRoleGet } from "@/interfaces/IRole";
import { fetchAll } from "@/services/Employee";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import useSWR from "swr";

interface IRoleComboBoxProps {
  value: IRoleGet | null;
  textFieldProps: TextFieldProps;
  handleChange: (value: IRoleGet | null) => void;
}

const RoleComboBox = ({
  value,
  textFieldProps,
  handleChange,
}: IRoleComboBoxProps) => {
  const { data, isLoading } = useSWR("api/roles", () =>
    fetchAll<IRoleGet>("api/roles")
  );

  return (
    <Autocomplete
      value={value}
      isOptionEqualToValue={(option: IRoleGet, value: IRoleGet | null) =>
        value !== null && option.id === value.id
      }
      options={data || []}
      loading={isLoading}
      onChange={(_event: any, newValue: IRoleGet | null) => {
        handleChange(newValue);
      }}
      getOptionLabel={(options: IRoleGet) => options.roleName}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

export default RoleComboBox;
