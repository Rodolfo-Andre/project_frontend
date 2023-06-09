import React from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ramdonKey } from '@/utils';


interface IProps<T> {
label:string
id :string
value:string
onChange:(e: SelectChangeEvent<string>) => void
ListOptions: T[]
idKey: keyof  T
nameKey: keyof T
isError?:boolean
messageError?:string
}


const SelectCustom = <T extends {}>({
    label,
    id,
    value,
    onChange,
    ListOptions,
    idKey,
    nameKey,
    isError = false,
    messageError = ''
}:IProps<T>) => {



    return (
        <FormControl 
        error={isError}
        sx={{ marginBottom: 2 }} fullWidth>
        <InputLabel  id={id}>{label}</InputLabel>
        <Select
            labelId={id}
            id={id}
            value={value}
            label={label}
            onChange={onChange}
        >
          {/* {state.data.listDish.map((item, index) => (
            <MenuItem key={ramdonKey(label)} value={item.id}>
              {item.nameDish}
            </MenuItem>
          ))} */}

            {ListOptions.map((item, index) => (
            <MenuItem key={ramdonKey(label)} value={item[idKey]}>
                {item[nameKey]}
            </MenuItem>
            ))}

        </Select>
        {isError && <p style={{ color: 'red' }}>{messageError}</p>}
      </FormControl>
  )
}


export default SelectCustom