import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetClientVisits } from "@/hooks/visit/useVisit";
import { formatDateTime } from "@/lib/utils/date";
import { ClientVisitItem } from "@/types/visit.interface";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const VisitTab = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);

  const { clientVisits = [], isLoadingClientVisits } =
    useGetClientVisits(clientId);

  const columns: ColumnDef<ClientVisitItem>[] = [
    {
      header: "Дата",
      accessorKey: "date",
      cell: ({ row }) => formatDateTime(row.original.date),
    },
    { header: "Сумма", accessorKey: "totalAmount" },
    { header: "Оплачено", accessorKey: "paidAmount" },
    { header: "Долг", accessorKey: "debtAmount" },
    { header: "Статус", accessorKey: "status" },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          size="tiny"
          onClick={() =>
            router.push(`/admin/clients/${clientId}/visits/${row.original.id}`)
          }
        >
          Открыть
        </Button>
      ),
    },
  ];

  if (isLoadingClientVisits) return <Loader />;

  return <DataTable columns={columns} data={clientVisits} />;
};

export default VisitTab;
