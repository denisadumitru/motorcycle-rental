import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../config/date';
import { useMemo } from 'react';

export default function DatePicker(props) {
  const { name, value: valueProp, minDate, maxDate, onChange, ...rest } = props;

  const value = dayjs(valueProp, DATE_FORMAT);

  const handleChange = (newValue) => {
    const dateString = dayjs(newValue).format(DATE_FORMAT) ?? '';
    onChange(newValue, dateString === 'Invalid Date' ? '' : dateString);
  };

  const { minValue, maxValue } = useMemo(() => {
    return {
      minValue: minDate ? dayjs(minDate, DATE_FORMAT) : undefined,
      maxValue: maxDate ? dayjs(maxDate, DATE_FORMAT) : undefined,
    };
  }, [minDate, maxDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        mask='__/__/____'
        inputFormat='DD/MM/YYYY'
        value={value}
        onChange={handleChange}
        renderInput={(textInputProps) => <TextField {...textInputProps} />}
        minDate={minValue}
        maxDate={maxValue}
        {...rest}
      />
    </LocalizationProvider>
  );
}
