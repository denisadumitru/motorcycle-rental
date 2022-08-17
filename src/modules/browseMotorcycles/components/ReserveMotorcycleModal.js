import {
  FormControl,
  FormLabel,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { DATE_FORMAT } from '../../../config/date';
import { Button } from '../../../shared/components/Button';
import { DatePicker } from '../../../shared/components/FormikFields';
import { StyledModalContent } from '../../../shared/components/Modal';

const DEFAULT_FROM_DATE = dayjs().format(DATE_FORMAT);
const DEFAULT_TO_DATE = dayjs().add(1, 'day').format(DATE_FORMAT);

const validationSchema = () =>
  yup.object().shape({
    from: yup.string().required('Please enter a start date'),
    to: yup.string().required('Please enter an end date'),
  });

export default function ReserveMotorcycleModal(props) {
  const { open, onClose, onReserveConfirm, motorcycle } = props;

  const onFormSubmit = (values) => {
    onReserveConfirm(motorcycle.id, values);
  };

  if (!motorcycle) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <StyledModalContent>
        <Typography id='modal-modal-title' variant='h6' component='h2' mb={3}>
          Reserve motorcycle
        </Typography>
        <Formik
          initialValues={{
            from: DEFAULT_FROM_DATE,
            to: DEFAULT_TO_DATE,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onFormSubmit(values);
          }}
          validationSchema={validationSchema()}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Stack direction='row' spacing={2} mb={2}>
                <FormControl sx={{ mb: 3 }}>
                  <FormLabel>From</FormLabel>
                  <Field
                    component={DatePicker}
                    minDate={motorcycle.availableFrom}
                    maxDate={motorcycle.availableTo}
                    name='from'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>To</FormLabel>
                  <Field
                    component={DatePicker}
                    minDate={motorcycle.availableFrom}
                    maxDate={motorcycle.availableTo}
                    name='to'
                  />
                </FormControl>
              </Stack>

              <Stack alignItems='center'>
                <Button disabled={!isValid || isSubmitting} type='submit'>
                  Confirm reservation
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModalContent>
    </Modal>
  );
}
