import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPropertyValue = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

export const StyledProperty = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));
