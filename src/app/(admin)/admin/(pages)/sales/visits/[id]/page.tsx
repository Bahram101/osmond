"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetVisit } from "@/hooks/visit/useVisit";
import { formatCurrency } from "@/lib/utils/helpers";
import { VisitDetailItem } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const SaleVisitPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const visId = Number(id);

  if (Number.isNaN(id)) {
    return null;
  }
  const { visit, isLoadingVisit } = useGetVisit(visId);
  
  if (isLoadingVisit) {
    return <Loader />;
  }

  if (!visit) return null;

  const columnHelper = createColumnHelper<VisitDetailItem>();
  const columns: ColumnDef<VisitDetailItem, any>[] = [
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
        <div className="text-center">{formatCurrency(row.original.servicePrice || 0)}</div>
      ),
    },
    {
      header: "Сумма",
      accessorKey: "total",
      cell: ({ row }) => (
        <div className="text-center">{formatCurrency(row.original.total)}</div>
      ),
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Продажи", href: "/admin/sales" },
          { label: "Визит #" + id },
        ]}
      />
      <ComponentCard>
        <div className="flex flex-col md:flex-row md:justify-between lg:items-start gap-3">
          <h3 className="text-xl font-semibold">Детали визита #{id}</h3>
          <Button
            size="xs"
            variant="outline"
            startIcon={<ArrowLeft size="18" />}
            onClick={() => router.push(`/admin/sales`)}
          >
            Назад
          </Button>
        </div>
        <DataTable columns={columns} data={visit.items} />
      </ComponentCard>
    </div>
  );
};

export default SaleVisitPage;
