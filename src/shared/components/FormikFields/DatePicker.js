import React from 'react';
import { DatePicker as BaseDatePicker } from '../DatePicker';

export default function DatePicker(props) {
  const {
    field: { onChange: _, ...field },
    form: { setFieldValue, setFieldTouched, ...form },
    type,
    ...rest
  } = props;

  return (
    <BaseDatePicker
      name={field.name}
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={
        form.errors[field.name] &&
        form.touched[field.name] &&
        String(form.errors[field.name])
      }
      type={type}
      {...rest}
      onChange={(dateValue, dateString) => {
        setFieldTouched(field.name, true, false);
        setFieldValue(field.name, dateString, true);
      }}
      {...field}
    />
  );
}
