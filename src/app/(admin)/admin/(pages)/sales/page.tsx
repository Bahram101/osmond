"use client";

import { Plus } from "lucide-react";
import BreadCrumb from "../../components/common/BreadCrumb";
import Button from "../../components/ui/button/Button";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ClientVisitItem } from "@/types/visit.interface";
import { formatCurrency, formatDateTime } from "@/lib/utils/helpers";
import Badge from "../../components/ui/badge/Badge";
import { VISIT_STATUS_COLOR, VISIT_STATUS_LABEL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useGetAllVisits } from "@/hooks/visit/useVisit";

const SalesPage = () => {
  const router = useRouter();
  const { allVisits, isLoadingAllVisits } = useGetAllVisits();

  if (isLoadingAllVisits) {
    <Loader />;
  }

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
                `/admin/sales/visits/${row.original.id}`,
              )
            }
          >
            Просмотр
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Продажи" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список продажи</h3>

          <Link href="/admin/sales/create">
            <Button
              size="xs"
              variant="success"
              startIcon={<Plus size="18" />}
              // onClick={() => handleOpenModal(null)}
            >
              Новая продажа
            </Button>
          </Link>
        </div>

        {<DataTable columns={columns} data={allVisits ?? []} />}
      </div>
    </div>
  );
};

export default SalesPage;
