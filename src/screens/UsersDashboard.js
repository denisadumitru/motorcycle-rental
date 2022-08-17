import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';
import { registerWithEmailAndPassword } from '../firebase';

import { AddEditUserModal, UsersTable } from '../modules/usersDashboard';
import { Button } from '../shared/components/Button';
import { Paper } from '../shared/components/Paper';
import useUsers from '../shared/hooks/useUsers';
import { ManagerLayout } from '../shared/layout';

export default function Dashboard() {
  const { isLoading, data, error, removeUser, updateUser } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (user) => {
    setModalOpen(true);
    setEditingUser(user);
  };

  const handleAddNewUser = () => {
    setModalOpen(true);
    setEditingUser(null);
  };

  const handleCreateNewUser = (values) => {
    registerWithEmailAndPassword(
      values.name,
      values.email,
      values.password,
      values.role,
      () => setModalOpen(false)
    );
  };

  const handleUpdateUser = (id, values) => {
    updateUser({
      id,
      newData: {
        role: values.role,
        name: values.name,
      },
    });
    setModalOpen(false);
  };

  const handleUserClick = (id) => {
    navigate(`${routes.UsersDashboard}/${id}`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <ManagerLayout>
      <Paper sx={{ p: 4 }}>
        <Box display='flex' justifyContent='flex-end' mb={2}>
          <Button onClick={handleAddNewUser}>Add new</Button>
        </Box>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {data?.length && (
          <UsersTable
            users={data}
            handleRemoveClick={removeUser}
            handleEditClick={handleEditClick}
            handleUserClick={handleUserClick}
          />
        )}
        <AddEditUserModal
          open={modalOpen}
          onClose={handleModalClose}
          user={editingUser}
          onCreateNewUser={handleCreateNewUser}
          onUpdateUser={handleUpdateUser}
        />
      </Paper>
    </ManagerLayout>
  );
}
