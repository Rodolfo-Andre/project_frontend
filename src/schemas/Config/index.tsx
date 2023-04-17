import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    default: "No es válido",
    required: "Este campo es requerido",
  },
  string: {
    email: "Correo electrónico inválido",
    length: "Debe tener exactamente ${length} caracteres",
    min: "Debe tener al menos ${min} caracteres",
    max: "Debe tener como máximo ${max} caracteres",
  },
  number: {
    min: "Debe ser como mínimo ${min}",
    max: "Debe ser como máximo ${max}",
    moreThan: "Debe ser mayor a ${more}",
    integer: "Debe ser un número entero",
  },
});

export default Yup;
