import { styled } from '@mui/system';

export const StyledModalContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(500px, 90%)',
  backgroundColor: 'white',
  boxShadow: 24,
  padding: theme.spacing(7),
  borderRadius: '12px',
}));
