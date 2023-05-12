import Autocomplete from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import useSWR from "swr";
import { fetchAll } from "@/services/HttpRequests";
import { useEffect, useState } from "react";

interface IComboBoxProps<T> {
  value?: string | number;
  id: keyof T;
  label: keyof T;
  url: string;
  textFieldProps: TextFieldProps;
  disabled?: boolean;
  handleChange: (value: T | null) => void;
}

const ComboBox = <T,>({
  value,
  url,
  id,
  label,
  textFieldProps,
  disabled,
  handleChange,
}: IComboBoxProps<T>) => {
  const { data, isLoading } = useSWR(url, () => fetchAll<T>(url));
  const [object, setObject] = useState<T | null>(null);

  useEffect(() => {
    if (!isLoading && value && data) {
      setObject(data.find((object) => object[id] === value) || null);
    }
  }, [isLoading, data, id, value]);

  return (
    <Autocomplete
      value={object}
      isOptionEqualToValue={(option: T, value: T) =>
        value && option[id] === value[id]
      }
      options={data || []}
      loading={isLoading}
      onChange={(_event: any, newValue: T | null) => {
        setObject(newValue);
        handleChange(newValue);
      }}
      disabled={disabled}
      getOptionLabel={(options: T) => options[label] as string}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

export default ComboBox;
