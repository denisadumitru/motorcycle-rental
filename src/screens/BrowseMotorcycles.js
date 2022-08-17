import { Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ReserveMotorcycleModal } from '../modules/browseMotorcycles/components';
import MotorcycleFilters from '../modules/browseMotorcycles/components/MotorcycleFilters';
import MotorcyclesList from '../modules/browseMotorcycles/components/MotorcyclesList';
import useUser from '../shared/hooks/useUser';

import useMotorcycles from '../shared/hooks/useMotorcycles';
import useReservations from '../shared/hooks/useReservations';
import UserLayout from '../shared/layout/UserLayout';

export default function BrowseMotorcycles() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reservingMotorcycle, setReservingMotorcycle] = useState(null);

  const {
    filteredMotorcycles: { data, isLoading, error },
    allMotorcycles,
    availableFilters,
    updateMotorcycle,
    selectedFilters,
    setSelectedFilters,
  } = useMotorcycles();
  const { createReservation } = useReservations();
  const { userData } = useUser();

  const handleRatingChange = (id, newValue) => {
    updateMotorcycle({ id, newData: { rating: newValue } });
  };

  const handleReserveMotorcycle = (motorcycle) => {
    if (!userData) return;

    setModalOpen(true);
    setReservingMotorcycle(motorcycle);
  };

  const handleConfirmReservation = (id, values) => {
    createReservation({
      motorcycleId: id,
      userId: userData.uid,
      from: values.from,
      to: values.to,
    });
    setModalOpen(false);
    setReservingMotorcycle(null);
  };

  return (
    <UserLayout>
      <Stack
        direction='row'
        spacing={3}
        divider={<Divider flexItem orientation='vertical' />}
        alignItems='flex-start'
      >
        {allMotorcycles.data && (
          <MotorcycleFilters
            filters={availableFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        )}
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {data?.length && (
          <MotorcyclesList
            motorcycles={data}
            onRatingChange={handleRatingChange}
            onReserveClick={handleReserveMotorcycle}
          />
        )}
        {!error && !isLoading && !data?.length && (
          <Typography>No results found</Typography>
        )}
      </Stack>
      <ReserveMotorcycleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        motorcycle={reservingMotorcycle}
        onReserveConfirm={handleConfirmReservation}
      />
    </UserLayout>
  );
}
