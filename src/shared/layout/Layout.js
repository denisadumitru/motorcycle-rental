import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { auth, logout } from '../../firebase';
import {
  StyledAppBarWrapper,
  StyledContainer,
  StyledMain,
} from './Layout.styled';
import { useAuthUser } from '@react-query-firebase/auth';
import useUser from '../hooks/useUser';

export default function Layout(props) {
  const { header, children } = props;
  const user = useAuthUser(['user'], auth);
  const { userData } = useUser();

  const handleLogout = () => {
    logout();
    user.remove();
  };

  return (
    <StyledMain>
      <StyledAppBarWrapper>
        <Stack direction='row' spacing={1}>
          <PersonOutlineIcon />
          <Typography>{userData?.name}</Typography>
        </Stack>
        <Button onClick={handleLogout}>Log out</Button>
      </StyledAppBarWrapper>
      <StyledContainer maxWidth='lg'>
        {header && (
          <Box component='header' px={{ xs: 2, md: 7 }} py={{ xs: 3, md: 5 }}>
            {header}
          </Box>
        )}
        <Box pb={7} width='100%'>
          {children}
        </Box>
      </StyledContainer>
    </StyledMain>
  );
}
