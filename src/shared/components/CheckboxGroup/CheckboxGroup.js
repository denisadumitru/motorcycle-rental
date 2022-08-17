import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

export default function CheckboxGroup(props) {
  const { value, onChange, checkboxes, name, label } = props;

  const handleChange = (event) => {
    const { value: newValue } = event.target;
    const newState = value.includes(newValue)
      ? value.filter((filter) => filter !== newValue)
      : [...value, newValue];

    onChange(newState, name);
  };

  return (
    <Stack spacing={5}>
      <FormControl sx={{ my: 2 }} component='fieldset' variant='standard'>
        <FormLabel component='legend'>{label}</FormLabel>
        <FormGroup>
          {checkboxes.map((checkbox) => (
            <FormControlLabel
              key={checkbox.value}
              control={
                <Checkbox
                  checked={value.includes(checkbox.value)}
                  onChange={handleChange}
                  name={name}
                  value={checkbox.value}
                />
              }
              label={checkbox.value}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
