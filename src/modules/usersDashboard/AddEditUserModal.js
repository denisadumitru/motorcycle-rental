import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Button } from '../../shared/components/Button';
import { TextField } from '../../shared/components/FormikFields';
import { StyledModalContent } from '../../shared/components/Modal';

const validationSchema = (isNewUser) =>
  yup.object().shape({
    name: yup.string().required('Please enter a name'),
    email: yup.string().required('Please enter email'),
    password: !isNewUser
      ? undefined
      : yup
          .string()
          .required('Please enter a password')
          .length(6, 'Password must be at least 6 characters long'),
  });

export default function AddEditUserModal(props) {
  const {
    user: userProp,
    open,
    onClose,
    onCreateNewUser,
    onUpdateUser,
  } = props;

  const isNewUser = !userProp;
  const newUser = { email: '', password: '', name: '', role: 'user' };
  const user = isNewUser ? newUser : userProp;

  const onFormSubmit = (values) => {
    if (isNewUser) {
      onCreateNewUser?.(values);
    } else {
      onUpdateUser?.(user.id, values);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <StyledModalContent>
        <Typography id='modal-modal-title' variant='h6' component='h2' mb={3}>
          User details
        </Typography>
        <Formik
          initialValues={{
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onFormSubmit(values);
          }}
          validationSchema={validationSchema(isNewUser)}
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
                <Field
                  disabled={!isNewUser}
                  component={TextField}
                  name='email'
                />
              </FormControl>

              {isNewUser && (
                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: 3,
                  }}
                >
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Field
                    component={TextField}
                    type='password'
                    name='password'
                  />
                </FormControl>
              )}

              <FormControl fullWidth>
                <FormLabel htmlFor='role'>Role</FormLabel>
                <Field
                  name='role'
                  component={(props) => (
                    <FormControlLabel
                      sx={{ mx: 0, mb: 5 }}
                      control={
                        <Select {...props.field} fullWidth>
                          <MenuItem value={'user'}>User</MenuItem>
                          <MenuItem value={'manager'}>Manager</MenuItem>
                        </Select>
                      }
                    />
                  )}
                ></Field>
              </FormControl>

              <Stack spacing={2}>
                <Button
                  disabled={!isValid || isSubmitting}
                  type='submit'
                  fullWidth
                >
                  {isNewUser ? 'Create user' : 'Update user'}
                </Button>
                <Button variant='outlined' fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModalContent>
    </Modal>
  );
}
