import { fetchAll } from "@/services/HttpRequests";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IComboBoxProps<T> {
  value?: string | number;
  id: keyof T;
  label: keyof T;
  url: string;
  textFieldProps: TextFieldProps;
  handleChange: (value: T | null) => void;
}

const ComboBox = <T,>({
  value,
  url,
  id,
  label,
  textFieldProps,
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
      getOptionLabel={(options: T) => options[label] as string}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

export default ComboBox;
