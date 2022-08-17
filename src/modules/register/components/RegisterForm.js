import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@mui/material';

import { Button } from '../../../shared/components/Button';
import { TextField } from '../../../shared/components/FormikFields';
import { NavLink } from 'react-router-dom';
import routes from '../../../config/routes';

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter name'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Please enter email'),
  password: yup.string().required('Please enter a password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function RegisterForm(props) {
  const { onFormSubmit } = props;

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isManager: false,
      }}
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
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Field component={TextField} name='name' />
          </FormControl>

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
              marginBottom: 3,
            }}
          >
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Field component={TextField} type='password' name='password' />
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              marginBottom: 5,
            }}
          >
            <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
            <Field
              component={TextField}
              type='password'
              name='confirmPassword'
            />
          </FormControl>

          <Field
            name='isManager'
            type='checkbox'
            component={(props) => (
              <FormControlLabel
                {...props.field}
                control={<Checkbox />}
                label='Register as Manager'
              />
            )}
          ></Field>

          <Typography variant='caption' component='p' textAlign='center' my={4}>
            Already have an account?{' '}
            <NavLink to={routes.Login}>Sign in</NavLink>
          </Typography>

          <Button
            disabled={!isValid || !dirty || isSubmitting}
            type='submit'
            fullWidth
          >
            Create account
          </Button>
        </Form>
      )}
    </Formik>
  );
}
