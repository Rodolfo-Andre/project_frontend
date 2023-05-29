import Autocomplete from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

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
  const [valueState, setValueState] = useState<T | null>(value ?? null);

  return (
    <Autocomplete
      value={valueState}
      isOptionEqualToValue={(option: T, value: T) =>
        value && option[id] === value[id]
      }
      options={values || []}
      onChange={(_event: any, newValue: T | null) => {
        handleChange(newValue);
        setValueState(newValue);
      }}
      disabled={disabled}
      getOptionLabel={(options: T) => options[label] as string}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

export default ComboBox;
