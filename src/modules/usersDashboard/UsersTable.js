import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import usePagination from '../../shared/hooks/usePagination';

export default function UsersTable(props) {
  const {
    users = [],
    handleEditClick,
    handleRemoveClick,
    handleUserClick,
  } = props;

  const pagination = usePagination({ data: users });
  const items = pagination.data;

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
  ];

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell padding='checkbox' />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((user) => (
              <TableRow key={user.uid} hover>
                {columns.map((column) => (
                  <TableCell key={`${column.id}-${user.uid}`}>
                    {user[column.id]}
                  </TableCell>
                ))}
                <TableCell align='right' padding='checkbox'>
                  <Stack direction='row' justifyContent='flex-end'>
                    {user.role !== 'manager' && (
                      <IconButton onClick={() => handleUserClick(user.uid)}>
                        <VisibilityIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleRemoveClick(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination {...pagination} />
    </Box>
  );
}
