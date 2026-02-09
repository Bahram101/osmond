import { formatCurrency, formatDateTime } from "@/lib/utils/helpers";
import { VisitDetailItem, VisitPayment } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<VisitDetailItem>();
export const columns: ColumnDef<VisitDetailItem, any>[] = [
  {
    header: "#",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  columnHelper.accessor((row) => row.product?.name ?? "-", {
    id: "product.name",
    header: "Товар",
  }),
  {
    header: "Цена",
    accessorKey: "price",
    cell: ({ row }) => (
      <div className="text-center">{formatCurrency(row.original.price)}</div>
    ),
  },
  {
    header: "Количество",
    accessorKey: "quantity",
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity} шт</div>
    ),
  },
  {
    header: "За работу",
    accessorKey: "servicePrice",
    cell: ({ row }) => (
      <div className="text-center">
        {formatCurrency(row.original.servicePrice || 0)}
      </div>
    ),
  },
  {
    header: "Сумма",
    accessorKey: "total",
    cell: ({ row }) => {
      // const 
      return (
        <div className="text-center">{formatCurrency(row.original.total)}</div>
      );
    },
  },
];

export const paymentColumns: ColumnDef<VisitPayment>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    header: "Дата",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-center">
        {formatDateTime(row.original.createdAt)}
      </div>
    ),
  },
  {
    header: "Сумма",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className="text-center">{formatCurrency(row.original.amount)}</div>
    ),
  },
  {
    header: "Комментария",
    accessorKey: "note",
  },
];
