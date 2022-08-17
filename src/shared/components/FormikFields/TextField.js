import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

export default function TextField(props) {
  const { form, field, type, ...rest } = props;

  return (
    <MuiTextField
      name={field.name}
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={
        form.errors[field.name] &&
        form.touched[field.name] &&
        String(form.errors[field.name])
      }
      type={type}
      {...rest}
      {...field}
    />
  );
}
