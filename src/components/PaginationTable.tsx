import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import { CustomSelect } from "./table/CustomSelect";
import { Button } from "./ui/button";

type PaginationTableProps<TData> = {
  table: Table<TData>;
};

export const PaginationTable = <TData,>({
  table,
}: PaginationTableProps<TData>) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const startRow = table.getState().pagination.pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">{totalRows > 0 ? startRow : 0}</span>
        to <span className="font-medium">{endRow}</span> of{" "}
        <span className="font-medium">{totalRows.toLocaleString()}</span>{" "}
        results
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 whitespace-nowrap">
            Rows per page:
          </label>
          <CustomSelect
            value={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
            options={[
              { value: "25", label: "25" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
            className="w-20"
          />
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1 px-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{pageCount}</span>
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
