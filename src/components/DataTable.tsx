import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { createColumns } from "@/constants/columns";
import type { SpotifyTrack } from "@/types/spotify.types";
import type { SortingState } from "@tanstack/react-table";
import { SearchBar } from "./SearchBar";
import { TableFilters } from "./TableFilters";
import { PaginationTable } from "./PaginationTable";
import { useTheme } from "@/hooks/useTheme";
import { Music } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { EmptyState } from "./EmptyState";

export const DataTable = ({ data }: { data: SpotifyTrack[] }) => {
  const { theme } = useTheme();
  const columns = useMemo(() => createColumns(), []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
  const hasFilters = globalFilter !== "";
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const startRow = table.getState().pagination.pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  const headerBg = theme === "light" ? "bg-white" : "bg-black";
  const headerBorder =
    theme === "light" ? "border-gray-200" : "border-gray-800";
  const headerText = theme === "light" ? "text-gray-600" : "text-gray-300";
  const tableBg = theme === "light" ? "bg-white" : "bg-black";
  const rowBorder = theme === "light" ? "border-gray-100" : "border-gray-900";
  const rowHover = theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-900";
  const rowText = theme === "light" ? "text-gray-700" : "text-gray-100";
  const titleText = theme === "light" ? "text-black" : "text-white";
  const subtitleText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const statsText = theme === "light" ? "text-gray-600" : "text-gray-400";
  const accentColor = "#E91E63";

  return (
    <div className="space-y-5 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: accentColor }}
          >
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-4xl font-bold ${titleText}`}>Music Library</h1>
            <p className={`text-sm ${subtitleText}`}>
              Browse and filter your track collection
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2.5">
        <SearchBar onSearchChange={handleSearchChange} />

        <div className={`flex items-center gap-2 text-sm ${statsText}`}>
          <span>Total:</span>
          <span className="font-bold" style={{ color: accentColor }}>
            {data.length.toLocaleString()}
          </span>
          {hasFilters && filteredRowCount !== data.length && (
            <>
              <span className="mx-2">•</span>
              <span className="font-bold" style={{ color: accentColor }}>
                {filteredRowCount.toLocaleString()}
              </span>
              <span>filtered</span>
            </>
          )}
        </div>
      </div>

      {filteredRowCount > 0 && (
        <p className={`text-sm ${subtitleText}`}>
          Showing{" "}
          <span className="font-semibold" style={{ color: accentColor }}>
            {totalRows > 0 ? startRow : 0}&nbsp;
          </span>
          to&nbsp;{" "}
          <span className="font-semibold" style={{ color: accentColor }}>
            {endRow}&nbsp;
          </span>
          of <span className="font-semibold"> {filteredRowCount}</span> results
        </p>
      )}

      <TableFilters table={table} data={data} />

      <div
        className={`border ${headerBorder} rounded-lg overflow-hidden ${tableBg}`}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={`${headerBg} ${headerBorder} border-b`}
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`px-6 py-4 text-xs font-semibold ${headerText} uppercase tracking-wide`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`${rowBorder} border-b ${rowHover} transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`px-6 py-4 text-sm ${rowText}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className={`px-6 py-16 text-center ${subtitleText}`}
                  >
                    <EmptyState
                      icon={<Music className="w-12 h-12 text-gray-400" />}
                      title="No tracks found"
                      description={
                        hasFilters
                          ? "Try adjusting your search or filters"
                          : "No data available"
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {filteredRowCount > 0 && <PaginationTable table={table} />}
      </div>
    </div>
  );
};
