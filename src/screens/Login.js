import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { LoginForm } from '../modules/login/components';
import { logInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  async function handleFormSubmit(values) {
    logInWithEmailAndPassword(values.email, values.password, () =>
      navigate('/')
    );
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' mt={8} textAlign={'center'}>
        Sign In
      </Typography>
      <Box mt={4}>
        <LoginForm onFormSubmit={handleFormSubmit} />
      </Box>
    </Container>
  );
}
