import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';

import { Button } from '../../../shared/components/Button';
import { DatePicker, TextField } from '../../../shared/components/FormikFields';
import { DATE_FORMAT } from '../../../config/date';
import { transformDayJSStringValue } from '../../../shared/utils.js/firebaseUtils';
import { StyledModalContent } from '../../../shared/components/Modal';

const validationSchema = (isNewMotorcycle) =>
  yup.object().shape({
    model: yup.string().required('Please enter a model'),
    color: yup.string().required('Please enter a color'),
    location: yup.string().required('Please enter a location'),
  });

const DEFAULT_AVAILABLE_FROM_DATE = dayjs().format(DATE_FORMAT);
const DEFAULT_AVAILABLE_TO_DATE = dayjs().add(3, 'month').format(DATE_FORMAT);

export default function AddEditMotorcycleModal(props) {
  const {
    motorcycle: motorcycleProp,
    open,
    onClose,
    onCreateNewMotorcycle,
    onUpdateMotorcycle,
  } = props;

  const isNewMotorcycle = !motorcycleProp;
  const newMotorcycle = {
    model: '',
    color: '',
    location: '',
    available: true,
    availableFrom: DEFAULT_AVAILABLE_FROM_DATE,
    availableTo: DEFAULT_AVAILABLE_TO_DATE,
  };
  const motorcycle = isNewMotorcycle ? newMotorcycle : motorcycleProp;

  const onFormSubmit = (values) => {
    const formattedValues = {
      ...values,
      availableFrom: transformDayJSStringValue(values.availableFrom),
      availableTo: transformDayJSStringValue(values.availableTo),
    };

    if (isNewMotorcycle) {
      onCreateNewMotorcycle?.(formattedValues);
    } else {
      onUpdateMotorcycle?.(motorcycle.id, formattedValues);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <StyledModalContent>
        <Typography id='modal-modal-title' variant='h6' component='h2' mb={3}>
          Motorcycle details
        </Typography>
        <Formik
          initialValues={{
            model: motorcycle.model,
            color: motorcycle.color,
            location: motorcycle.location,
            available: motorcycle.available,
            availableFrom: motorcycle.availableFrom,
            availableTo: motorcycle.availableTo,
          }}
          validateOnMount
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onFormSubmit(values);
          }}
          validationSchema={validationSchema(isNewMotorcycle)}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: 3,
                }}
              >
                <FormLabel htmlFor='model'>Model</FormLabel>
                <Field component={TextField} name='model' />
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  marginBottom: 3,
                }}
              >
                <FormLabel htmlFor='color'>Color</FormLabel>
                <Field component={TextField} name='color' />
              </FormControl>

              {isNewMotorcycle && (
                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: 3,
                  }}
                >
                  <FormLabel htmlFor='location'>Location</FormLabel>
                  <Field component={TextField} name='location' />
                </FormControl>
              )}

              <FormControl fullWidth>
                <Field
                  name='available'
                  type='checkbox'
                  component={(props) => (
                    <FormControlLabel
                      {...props.field}
                      control={<Checkbox />}
                      label='Is available'
                    />
                  )}
                ></Field>
              </FormControl>

              {values.available && (
                <Stack direction='row' justifyContent='space-between'>
                  <FormControl sx={{ mt: 3 }}>
                    <FormLabel>Available from: </FormLabel>
                    <Field component={DatePicker} name='availableFrom' />
                  </FormControl>

                  <FormControl sx={{ mt: 3 }}>
                    <FormLabel>Available to: </FormLabel>
                    <Field component={DatePicker} name='availableTo' />
                  </FormControl>
                </Stack>
              )}

              <Stack spacing={2} mt={3}>
                <Button
                  disabled={!isValid || isSubmitting}
                  type='submit'
                  fullWidth
                >
                  {isNewMotorcycle ? 'Create motorcycle' : 'Update motorcycle'}
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
