import Badge from "@/app/(admin)/admin/components/ui/badge/Badge";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetClientVisits } from "@/hooks/visit/useVisit";
import { VISIT_STATUS_COLOR, VISIT_STATUS_LABEL } from "@/lib/constants/visit";
import { formatCurrency, formatDateTime } from "@/lib/utils/helpers";
import { ClientVisitItem } from "@/types/visit.interface";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";

const VisitTab = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);

  const { clientVisits = [], isLoadingClientVisits } =
    useGetClientVisits(clientId);

  const columns: ColumnDef<ClientVisitItem>[] = [
    {
      header: "Визит",
      accessorKey: "id",
      cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
    },
    {
      header: "Дата",
      accessorKey: "date",
      cell: ({ row }) => (
        <div className="text-center">{formatDateTime(row.original.date)}</div>
      ),
    },
    {
      header: "Сумма",
      accessorKey: "totalAmount",
      cell: ({ row }) => (
        <div className="text-center">
          {formatCurrency(row.original.totalAmount)}
        </div>
      ),
    },

    {
      header: "Оплачено",
      accessorKey: "paidAmount",
      cell: ({ row }) => {
        const val = row.original.paidAmount;
        return (
          <div className="text-center">{val > 0 ? formatCurrency(val) : 0}</div>
        );
      },
    },
    {
      header: "Долг",
      accessorKey: "debtAmount",
      cell: ({ row }) => {
        const val = row.original.debtAmount;
        return (
          <div className="text-center">{val > 0 ? formatCurrency(val) : 0}</div>
        );
      },
    },
    {
      header: "Статус",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge
            variant="light"
            color={VISIT_STATUS_COLOR[row.original.status]}
          >
            {VISIT_STATUS_LABEL[row.original.status]}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button
            size="tiny"
            onClick={() =>
              router.push(
                `/admin/clients/${clientId}/visits/${row.original.id}`
              )
            }
          >
            Открыть
          </Button>
        </div>
      ),
    },
  ];

  if (isLoadingClientVisits) return <Loader />;

  return <DataTable columns={columns} data={clientVisits} />;
};

export default VisitTab;
