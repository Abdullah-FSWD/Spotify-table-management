import { useCallback, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { createColumns } from '@/constants/columns';
import type { SpotifyTrack } from '@/types/spotify.types';
import type { SortingState } from '@tanstack/react-table';
import { SearchBar } from './SearchBar';
import { TableFilters } from './TableFilters';
import { PaginationTable } from './PaginationTable';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from './ui/table';

export const DataTable = ({ data }: { data: SpotifyTrack[] }) => {
  const columns = useMemo(() => createColumns(), []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const value = row.getValue(columnId);

      if (value == null) return false;

      return String(value).toLowerCase().includes(search);
    },
  });

  const handleSearchChange = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  const filteredRowCount = table.getFilteredRowModel().rows.length;
  const hasFilters = globalFilter !== '';

  return (
    <div className="space-y-4 m-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md w-full">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Total:
            <span className="font-semibold text-gray-900">
              {data.length.toLocaleString()}
            </span>
            {hasFilters && filteredRowCount !== data.length && (
              <>
                Filtered:{' '}
                <span className="font-semibold text-gray-600">
                  {filteredRowCount.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <TableFilters table={table} data={data} />
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="px-4 py-16 text-center"
                  ></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 whitespace-nowrap text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-16 text-center"
                  ></td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
        {filteredRowCount > 0 && <PaginationTable table={table} />}
      </div>
    </div>
  );
};
