import { FormControl, FormLabel, Rating } from '@mui/material';
import { Stack } from '@mui/system';
import CheckboxGroup from '../../../shared/components/CheckboxGroup/CheckboxGroup';
import { DatePicker } from '../../../shared/components/DatePicker';
import { StyledDatePickersWrapper } from './MotorcycleFilters.styled';

export default function MotorcycleFilters(props) {
  const { filters, selectedFilters, setSelectedFilters } = props;

  if (!filters) return null;

  const handleChange = (value, name) => {
    setSelectedFilters((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const generateCheckboxes = (filterOptions) =>
    filterOptions.map((option) => ({ value: option, label: option }));

  return (
    <Stack width='300px'>
      {['color', 'location', 'model'].map((filter) => (
        <CheckboxGroup
          key={filter}
          checkboxes={generateCheckboxes(filters[filter])}
          value={selectedFilters[filter]}
          label={filter.toUpperCase()}
          name={filter}
          onChange={handleChange}
        />
      ))}
      <FormControl sx={{ my: 3 }}>
        <FormLabel>Minimum rating</FormLabel>
        <Rating
          sx={{ mt: 1 }}
          onChange={(evt, newValue) => handleChange(newValue, 'rating')}
          value={selectedFilters.rating}
        />
      </FormControl>

      <StyledDatePickersWrapper>
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Available from</FormLabel>
          <DatePicker
            onChange={(value, stringValue) =>
              handleChange(stringValue, 'availableFrom')
            }
            value={selectedFilters.availableFrom}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Available to</FormLabel>
          <DatePicker
            onChange={(value, stringValue) =>
              handleChange(stringValue, 'availableTo')
            }
            value={selectedFilters.availableTo}
          />
        </FormControl>
      </StyledDatePickersWrapper>
    </Stack>
  );
}
