import { Container } from '@mui/material';
import { styled } from '@mui/system';

export const StyledMain = styled('main')(
  ({ theme }) => `
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing(4)};
  overflow-y: scroll;
`
);

export const StyledContainer = styled(Container)(
  ({ theme }) => `
  margin: ${theme.spacing(14)} ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
);

export const StyledAppBarWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'white',
  zIndex: 10,
  padding: `${theme.spacing(2)} ${theme.spacing(2)} 0`,
  boxSizing: 'border-box',
}));
