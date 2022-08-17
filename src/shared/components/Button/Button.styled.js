import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonBase = styled(MuiButton)(
  ({ theme }) => `
  border-radius: 8px;
  padding: ${theme.spacing(1)} ${theme.spacing(3)};
`
);

export const StyledFilledButton = styled(StyledButtonBase)(
  ({ theme }) => `
  background: linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main});
  color: white;

  &[disabled] {
    background: ${theme.palette.grey[300]};
    color: white;
  }
`
);

export const StyledOutlinedButton = styled(StyledButtonBase)(
  ({ theme }) => `
  border-color: linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main});
`
);
