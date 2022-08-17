import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';
import ReservationsTable from '../shared/components/ReservationsTable/ReservationsTable';
import useUser from '../shared/hooks/useUser';
import useReservations from '../shared/hooks/useReservations';
import UserLayout from '../shared/layout/UserLayout';
import { Paper } from '../shared/components/Paper';

export default function MyReservations() {
  const { userData } = useUser();
  const {
    reservationsByUserId: { isLoading, data, error },
    removeReservation,
  } = useReservations({
    userId: userData?.uid,
  });
  const navigate = useNavigate();

  if (isLoading || !data) return 'Loading...';
  if (error) return 'Something went wrong';

  const handleRemoveReservation = (id) => {
    removeReservation(id);
  };

  return (
    <UserLayout>
      <Paper sx={{ px: 4, py: 7 }}>
        {data?.length ? (
          <ReservationsTable
            showMotorcycleId
            enableRemoval
            reservations={data}
            handleRemoveClick={handleRemoveReservation}
            handleSeeMotorcycleClick={(motorcycleId) => {
              navigate(`${routes.MotorcycleDetails}/${motorcycleId}`);
            }}
          />
        ) : (
          <Typography>No reservations yet</Typography>
        )}
      </Paper>
    </UserLayout>
  );
}
