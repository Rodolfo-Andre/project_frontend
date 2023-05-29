import Autocomplete from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface IComboBoxProps<T> {
  value?: T;
  values: T[];
  id: keyof T;
  label: keyof T;
  textFieldProps: TextFieldProps;
  disabled?: boolean;
  handleChange: (value: T | null) => void;
}

const ComboBox = <T,>({
  value,
  values,
  id,
  label,
  textFieldProps,
  disabled,
  handleChange,
}: IComboBoxProps<T>) => {
  return (
    <Autocomplete
      value={value}
      isOptionEqualToValue={(option: T, value: T) =>
        value && option[id] === value[id]
      }
      options={values || []}
      onChange={(_event: any, newValue: T | null) => {
        handleChange(newValue);
      }}
      disabled={disabled}
      getOptionLabel={(options: T) => options[label] as string}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

export default ComboBox;
