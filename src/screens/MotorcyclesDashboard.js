import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';

import {
  AddEditMotorcycleModal,
  MotorcyclesTable,
} from '../modules/motorcyclesDashboard/components';
import { Button } from '../shared/components/Button';
import { Paper } from '../shared/components/Paper';
import useMotorcycles from '../shared/hooks/useMotorcycles';
import { ManagerLayout } from '../shared/layout';

export default function MotorcyclesDashboard() {
  const {
    allMotorcycles: { isLoading, data, error },
    removeMotorcycle,
    updateMotorcycle,
    createMotorcycle,
  } = useMotorcycles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMotorcycle, setEditingMotorcycle] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (motorcycle) => {
    setModalOpen(true);
    setEditingMotorcycle(motorcycle);
  };

  const handleAddNewMotorcycle = () => {
    setModalOpen(true);
    setEditingMotorcycle(null);
  };

  const handleCreateNewMotorcycle = (values) => {
    createMotorcycle({ ...values, rating: 0 });
    setModalOpen(false);
  };

  const handleUpdateMotorcycle = (id, values) => {
    updateMotorcycle({
      id,
      newData: values,
    });
    setModalOpen(false);
  };

  const handleMotorcycleClick = (id) => {
    navigate(`${routes.MotorcyclesDashboard}/${id}`);
  };

  return (
    <ManagerLayout>
      <Paper sx={{ p: 4 }}>
        <Box display='flex' justifyContent='flex-end' mb={2}>
          <Button onClick={handleAddNewMotorcycle}>Add new</Button>
        </Box>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {data?.length && (
          <MotorcyclesTable
            motorcycles={data}
            handleRemoveClick={removeMotorcycle}
            handleEditClick={handleEditClick}
            handleMotorcycleClick={handleMotorcycleClick}
          />
        )}
        <AddEditMotorcycleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          motorcycle={editingMotorcycle}
          onCreateNewMotorcycle={handleCreateNewMotorcycle}
          onUpdateMotorcycle={handleUpdateMotorcycle}
        />
        {!error && !isLoading && !data?.length && (
          <Typography>No results found</Typography>
        )}
      </Paper>
    </ManagerLayout>
  );
}
