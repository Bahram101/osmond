"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetVisit } from "@/hooks/visit/useVisit";
import { VisitDetailItem } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import VisitSummary from "./components/VisitSummary";
import { formatCurrency } from "@/lib/utils/helpers";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { ArrowLeft, Plus } from "lucide-react";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";

const ClientVisitPage = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { id, visitId } = useParams<{ id: string; visitId: string }>();
  const clientId = Number(id);
  const visId = Number(visitId);

  if (Number.isNaN(visId)) {
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
      header: "Сумма",
      accessorKey: "total",
      cell: ({ row }) => (
        <div className="text-center">{formatCurrency(row.original.total)}</div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Клиенты", href: "/admin/clients" },
          {
            label: visit.client.fullName ?? "Клиент",
            href: `/admin/clients/${id}`,
          },
          { label: `Визит №${visId}` },
        ]}
      />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Принят оплату"
      >
        asdf
      </Modal>

      <ComponentCard>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <VisitSummary visit={visit} clientId={clientId} />
          <div className="flex flex-col lg:flex-row lg:items-start gap-3">
            <Button
              size="xs"
              variant="outline"
              startIcon={<ArrowLeft size="18" />}
              onClick={() => router.push(`/admin/clients/${clientId}`)}
            >
              Назад
            </Button>
            <Button
              size="xs"
              variant="success"
              startIcon={<Plus size="18" />}
              onClick={openModal}
            >
              Принят оплату
            </Button>
          </div>
        </div>

        <hr />
        <DataTable columns={columns} data={visit?.items} />
      </ComponentCard>
    </>
  );
};

export default ClientVisitPage;
