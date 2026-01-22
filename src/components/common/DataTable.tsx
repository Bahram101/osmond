import Button from "@/app/(admin)/admin/components/ui/button/Button";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import cn from "clsx";
import { ReactNode, useState } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  rowClassName?: (row: TData) => string;
  pagination?: boolean;
  pageSize?: number;
  footerRight?: ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  rowClassName,
  pagination,
  pageSize,
  footerRight,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
  });

  const hasFooter = table.getAllColumns().some((col) => col.columnDef.footer);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200 table-fixed ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => {
                const column = header.column;
                return (
                  <th
                    key={header.id}
                    className={cn(
                      "px-2 py-1 border-r last:border-r-0",
                      (column.columnDef.meta as any)?.className,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className={rowClassName?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 py-2 font-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {hasFooter && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <td key={header.id} className="px-3 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
      {pagination && (
        <div className="flex items-center gap-2 mt-4">
          <div className="flex gap-2">
            <Button
              size="xs"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Назад
            </Button>

            <Button
              size="xs"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Вперёд
            </Button>
          </div>
          {footerRight}
        </div>
      )}
    </div>
  );
}
