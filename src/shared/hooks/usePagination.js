import { useMemo, useState } from 'react';

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 50, 100];

export default function usePagination({
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  page: initialPage = 0,
  data = [],
  rowsPerPage: initialRowsPerPage = DEFAULT_ROWS_PER_PAGE_OPTIONS[0],
}) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = useMemo(
    () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, data]
  );

  return {
    rowsPerPageOptions,
    count: data.length,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    data: paginatedData,
  };
}
