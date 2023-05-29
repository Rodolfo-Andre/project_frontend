import React, { useCallback, useEffect, useMemo } from "react";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AxiosServices } from "@/services";
import { handleError } from "@/utils";
import { AxiosError } from "axios";

export interface IInput {
  placeholder: string;
  id: string;
  type: "text" | "email" | "password" | "number";
  value: string;
  validation: {
    required?: string;
    max?: number;
    min?: number;
    pattern?: RegExp;
  };
  isCombo: boolean;
  options?: {
    value: string | number;
    label: string;
  }[];
}
interface IProps {
  inputs: IInput[];
  api: string;
  paginado: {
    pagina: number;
    tamanio: number;
  };
  parmas?: Record<string, any>;
  setData: (data: any) => void;
}

const SearchForm = ({
  api,
  inputs,
  paginado,
  parmas,
  setData,
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  // const [inputsState, setInputs] = useState(inputs);

  const initialValues = useMemo(
    () =>
      inputs.reduce((acc, { id, value }) => {
        acc[id] = value;
        return acc;
      }, {} as Record<string, any>),
    [inputs]
  );

  const validaciones = (objectos: IInput[]) => {
    let validaciones: Record<string, any> = {};
    objectos.forEach((objeto) => {
      if (objeto.validation.required) {
        validaciones[objeto.id] = yup
          .string()
          .required(objeto.validation.required);
      }
      if (objeto.validation.max) {
        validaciones[objeto.id] = yup.string().max(objeto.validation.max);
      }
      if (objeto.validation.min) {
        validaciones[objeto.id] = yup.string().min(objeto.validation.min);
      }
      if (objeto.validation.pattern) {
        validaciones[objeto.id] = yup
          .string()
          .matches(objeto.validation.pattern);
      }
    });
    return validaciones;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object(validaciones(inputs)),
    onSubmit: async (data, { setErrors }) => {
      console.log({ ...data, ...parmas });
      if (formik.isValid) {
        try {
          setLoading(true);
          const { data: response, status } = await AxiosServices.get(api, {
            params: { ...data,  ...parmas },
          });

          if (status === 200) {
            setData(response);
            
          }
          return;
        } catch (error) {
          const errores = error as AxiosError;
          handleError(errores);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <Box>
      <form
        style={{
          gap: "10px",
          display: "flex",
        }}
        onSubmit={formik.handleSubmit}
      >
        {inputs.map((input) => {
          return (
            <Box display={"flex"} key={input.id}>
              {input.isCombo ? (
                <>
                  <FormControl
                    sx={{
                      minWidth: "200px",
                      maxWidth: "300px",
                    }}
                  >
                    <InputLabel
                      color={formik.errors[input.id] ? "error" : "primary"}
                      id={`label-${input.id}`}
                    >
                      {input.placeholder}
                    </InputLabel>
                    <Select
                      labelId={`label-${input.id}`}
                      id={input.id}
                      label={input.placeholder}
                      name={input.id}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      error={formik.errors[input.id] ? true : false}
                      value={formik.values[input.id]}
                    >
                      {input.options?.map((option) => {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formik.errors[input.id] ? (
                      <Box
                        sx={{
                          color: "#d32f2f",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        {formik.errors[input.id]?.toString()}
                      </Box>
                    ) : null}
                  </FormControl>
                </>
              ) : (
                <TextField
                  error={formik.errors[input.id] ? true : false}
                  helperText={formik.errors[input.id]?.toString()}
                  id={input.id}
                  name={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={formik.handleChange}
                  value={formik.values[input.id]}
                  variant="outlined"
                  fullWidth
                  label={input.placeholder}
                />
              )}
            </Box>
          );
        })}
        <Button
          sx={{
            marginTop: 2,
          }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default SearchForm;
