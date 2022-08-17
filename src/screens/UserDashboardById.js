import { Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { ReservationsTable } from '../shared/components/ReservationsTable';
import { BackButton } from '../shared/components/BackButton';
import useReservations from '../shared/hooks/useReservations';
import { ManagerLayout } from '../shared/layout';
import routes from '../config/routes';
import { Paper } from '../shared/components/Paper';
import useUser from '../shared/hooks/useUser';

export default function UserDashboardById() {
  const params = useParams();
  const navigate = useNavigate();
  const { userData } = useUser(params.id);

  const {
    reservationsByUserId: { isLoading, data, error },
  } = useReservations({
    userId: params?.id,
  });

  if (isLoading || !data) return 'Loading...';
  if (error) return 'Something went wrong';

  return (
    <ManagerLayout>
      <Paper sx={{ p: 5 }}>
        <Stack direction='row' spacing={3} my={3} alignItems='center'>
          <BackButton onClick={() => navigate(-1)} />
          <Typography variant='h4'>
            Reservations made by user {userData?.name}
          </Typography>
        </Stack>
        {data?.length ? (
          <ReservationsTable
            showMotorcycleId
            reservations={data}
            handleSeeMotorcycleClick={(motorcycleId) => {
              navigate(`${routes.MotorcycleDetails}/${motorcycleId}`);
            }}
          />
        ) : (
          <Typography>No reservations yet</Typography>
        )}
      </Paper>
    </ManagerLayout>
  );
}
