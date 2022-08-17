import { styled } from '@mui/system';

export const StyledDatePickersWrapper = styled('div')(
  ({ theme }) => `
    & fieldset {
        border-color: ${theme.palette.grey[400]} !important;
    }
`
);
