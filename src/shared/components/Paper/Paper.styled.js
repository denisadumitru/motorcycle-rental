import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/system';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '-2px 4px 17px 0px rgba(0,0,0,0.3)',
}));
