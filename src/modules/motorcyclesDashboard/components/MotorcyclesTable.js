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
import usePagination from '../../../shared/hooks/usePagination';

export default function MotorcyclesTable(props) {
  const {
    motorcycles = [],
    handleEditClick,
    handleRemoveClick,
    handleMotorcycleClick,
  } = props;

  const pagination = usePagination({ data: motorcycles });
  const items = pagination.data;

  const columns = [
    { id: 'model', label: 'Model' },
    { id: 'color', label: 'Color' },
    { id: 'location', label: 'Location' },
    { id: 'rating', label: 'Rating' },
    { id: 'availableFrom', label: 'Available from' },
    { id: 'availableTo', label: 'Available to' },
  ];

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
              <TableCell padding='checkbox' />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((motorcycle) => (
              <TableRow key={motorcycle.id} hover>
                {columns.map((column) => (
                  <TableCell key={`${column.id}-${motorcycle.uid}`}>
                    <p>{`${motorcycle[column.id] ?? '-'}`}</p>
                  </TableCell>
                ))}
                <TableCell align='right' padding='checkbox'>
                  <Stack direction='row'>
                    <IconButton
                      onClick={() => handleMotorcycleClick(motorcycle.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveClick(motorcycle.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(motorcycle)}>
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
