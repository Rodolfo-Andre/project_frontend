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
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ReactNode;
  isErrored: boolean;
  errorText: string;
  type: string;
  disabled?: boolean;
   
}

export const InputForm = ({
  id,
  label,
  value,
  onChange,
  Icon,
  isErrored,
  errorText,
  type = "text",
  disabled = false,

}: IInputForm) => {
  return (
    <FormControl
      
    
    fullWidth sx={{ mb: 1 }}>
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        startAdornment={
          <InputAdornment position="start">{Icon ? Icon : null}</InputAdornment>
        }
        disabled={disabled}
        type={type}
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
