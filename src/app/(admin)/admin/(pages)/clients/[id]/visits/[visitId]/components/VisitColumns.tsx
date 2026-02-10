import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { formatCurrency, formatDateTime } from "@/lib/utils/helpers";
import { VisitDetailItem, VisitPayment } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<VisitDetailItem>();


type VisitColumnsProps = {
  onReturn: (item: VisitDetailItem) => void;
};

export const visitColumns = ({
  onReturn,
}: VisitColumnsProps): ColumnDef<VisitDetailItem, string>[] => [
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
      return (
        <div className="text-center">{formatCurrency(row.original.total)}</div>
      );
    },
  },
  columnHelper.display({
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            size="tiny"
            disabled={row.original.quantity === 0}
          >
            Возврат
          </Button>
        </div>
      );
    },
  }),
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
