import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

interface IInputForm {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ReactNode;
  isErrored: boolean;
  errorText: string;
}

export const InputForm = ({
  id,
  label,
  value,
  onChange,
  Icon,
  isErrored,
  errorText,
}: IInputForm) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        startAdornment={
          <InputAdornment position="start">{Icon ? Icon : null}</InputAdornment>
        }
        label={label}
        value={value}
        onChange={onChange}
      />
      {isErrored && (
        <Box sx={{ color: "red", fontSize: "12px" }}>{errorText}</Box>
      )}
    </FormControl>
  );
};
