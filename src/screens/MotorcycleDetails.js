import { Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MotorcycleDetailsList from '../modules/motorcycleDetails/components/MotorcycleDetailsList';
import { BackButton } from '../shared/components/BackButton';
import { Paper } from '../shared/components/Paper';
import useMotorcycles from '../shared/hooks/useMotorcycles';
import Layout from '../shared/layout/Layout';

export default function MotorcycleDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    motorcycle: { isLoading, error, data },
  } = useMotorcycles(params.id);

  return (
    <Layout>
      <Paper sx={{ p: 5, pb: 8 }}>
        <Stack direction='row' spacing={3} my={3} alignItems='center'>
          <BackButton onClick={() => navigate(-1)} />
          <Typography variant='h4'>Motorcycle details</Typography>
        </Stack>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {data && <MotorcycleDetailsList motorcycle={data} />}
        {!error && !isLoading && !data && (
          <Typography>No details found</Typography>
        )}
      </Paper>
    </Layout>
  );
}
