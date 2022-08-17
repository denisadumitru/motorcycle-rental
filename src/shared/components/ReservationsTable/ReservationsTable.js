import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function ReservationsTable(props) {
  const {
    showUserId,
    showMotorcycleId,
    reservations,
    handleRemoveClick,
    enableRemoval,
    handleSeeMotorcycleClick,
  } = props;

  const columns = [
    { id: 'id', label: 'Reservation ID' },
    ...(showUserId ? [{ id: 'userId', label: 'User ID' }] : []),
    ...(showMotorcycleId
      ? [{ id: 'motorcycleId', label: 'Motorcycle ID' }]
      : []),
    { id: 'from', label: 'From' },
    { id: 'to', label: 'To' },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <strong>{column.label}</strong>
              </TableCell>
            ))}
            {enableRemoval && <TableCell />}
            {<TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              {columns.map((column) => (
                <TableCell key={`${column.id}-${reservation.uid}`}>
                  <p>{`${reservation[column.id]}`}</p>
                </TableCell>
              ))}
              {enableRemoval && (
                <TableCell align='right'>
                  <Button onClick={() => handleRemoveClick(reservation.id)}>
                    Cancel
                  </Button>
                </TableCell>
              )}
              <TableCell align='right'>
                <Button
                  onClick={() =>
                    handleSeeMotorcycleClick(reservation.motorcycleId)
                  }
                >
                  See motorcycle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
