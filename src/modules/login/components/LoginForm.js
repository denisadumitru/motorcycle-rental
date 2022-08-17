import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { FormControl, FormLabel, Typography } from '@mui/material';

import { Button } from '../../../shared/components/Button';
import { TextField } from '../../../shared/components/FormikFields';
import { NavLink } from 'react-router-dom';
import routes from '../../../config/routes';

const validationSchema = yup.object().shape({
  email: yup.string().required('Please enter email'),
  password: yup
    .string()
    .required('Please enter a password')
    .length(6, 'Password must be at least 6 characters long'),
});

export default function LoginForm(props) {
  const { onFormSubmit } = props;

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onFormSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <FormControl
            fullWidth
            sx={{
              marginBottom: 3,
            }}
          >
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Field component={TextField} name='email' />
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              marginBottom: 5,
            }}
          >
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Field component={TextField} type='password' name='password' />
          </FormControl>

          <Typography variant='caption' component='p' textAlign='center' mb={4}>
            Don't have an account?{' '}
            <NavLink to={routes.Register}>Register</NavLink>
          </Typography>

          <Button
            disabled={!isValid || !dirty || isSubmitting}
            type='submit'
            fullWidth
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
