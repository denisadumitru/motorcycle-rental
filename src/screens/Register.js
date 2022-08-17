import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { RegisterForm } from '../modules/register/components';
import { registerWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  function onFormSubmit(values) {
    registerWithEmailAndPassword(
      values.name,
      values.email,
      values.password,
      values.isManager ? 'manager' : 'user',
      () => navigate('/')
    );
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' mt={8} textAlign={'center'}>
        Register
      </Typography>
      <Box mt={4}>
        <RegisterForm onFormSubmit={onFormSubmit} />
      </Box>
    </Container>
  );
}
