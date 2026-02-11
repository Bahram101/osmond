"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetVisit, useRefundVisitItem } from "@/hooks/visit/useVisit";
import { useParams, useRouter } from "next/navigation";
import VisitSummary from "./components/VisitSummary";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { ArrowLeft, Plus } from "lucide-react";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";
import PaymentForm from "./components/PaymentForm";
import RefundForm from "./components/RefundForm";
import { useForm } from "react-hook-form";
import {
  PaymentFormValues,
  PaymentCreateDTO,
  RefundFormValues,
} from "@/types/payment.interface";
import { useCreatePayment } from "@/hooks/payment/usePayments";
import { useEffect, useState } from "react";
// import { visitColumns, paymentColumns } from "./components/VisitColumns";
import {
  VisitDetailItem,
  VisitItemRefundDTO,
  VisitPayment,
} from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { formatCurrency, formatDateTime } from "@/lib/utils/helpers";

const ClientVisitPage = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isReturnOpen,
    openModal: openReturnModal,
    closeModal: closeReturnModal,
  } = useModal();
  const [selectedItem, setSelectedItem] = useState<VisitDetailItem | null>(
    null,
  );
  const { createPayment, isCreatingPayment } = useCreatePayment();
  const { refundVisitItem, isRefundingVisitItem } = useRefundVisitItem();
  const { id, visitId } = useParams<{ id: string; visitId: string }>();
  const clientId = Number(id);
  const visId = Number(visitId);

  if (Number.isNaN(visId)) {
    return null;
  }
  const { visit, isLoadingVisit } = useGetVisit(visId);
  const { control, handleSubmit, reset } = useForm<PaymentFormValues>({
    defaultValues: {
      amount: 0,
    },
  });
  const {
    control: refundControl,
    handleSubmit: handleRefundSubmit,
    reset: resetRefund,
  } = useForm<RefundFormValues>({
    defaultValues: {
      quantity: 0,
    },
  });

  useEffect(() => {
    if (visit) {
      reset({
        amount: visit.debtAmount,
      });
    }
  }, [visit]);

  if (isLoadingVisit) {
    return <Loader />;
  }

  if (!visit) return null;

  const handlePaymentFormSubmit = (data: PaymentFormValues) => {
    const body: PaymentCreateDTO = {
      visitId: visId,
      amount: Number(data.amount),
      note: data.note,
    };

    createPayment(
      { id: visId, clientId, data: body },
      {
        onSuccess: () => {
          reset();
          closeModal();
        },
      },
    );
  };

  const handleRefundFormSubmit = (qtyToReturn: RefundFormValues) => {
    if (!selectedItem) return;
    const body: VisitItemRefundDTO = {
      visitItemId: selectedItem.id,
      quantityToReturn: Number(qtyToReturn.quantity),
    };
    refundVisitItem(
      { visitId: visId, data: body },
      {
        onSuccess: () => {
          resetRefund();
          closeReturnModal();
        },
      },
    );
  };

  const columnHelper = createColumnHelper<VisitDetailItem>();

  type VisitColumnsProps = {
    onReturn: (item: VisitDetailItem) => void;
  };

  const visitColumns = ({
    onReturn,
  }: VisitColumnsProps): ColumnDef<VisitDetailItem, any>[] => [
    {
      header: "#",
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      header: "Товар",
      accessorKey: "product.name",
    },
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
          <div className="text-center">
            {formatCurrency(row.original.total)}
          </div>
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
              onClick={() => onReturn(row.original)}
            >
              Возврат
            </Button>
          </div>
        );
      },
    }),
  ];

  const paymentColumns: ColumnDef<VisitPayment>[] = [
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

  const columns = visitColumns({
    onReturn: (item) => {
      setSelectedItem(item);
      openReturnModal();
    },
  });

  console.log("selectedItem", selectedItem);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Мастеры", href: "/admin/clients" },
          {
            label: visit.client.fullName ?? "Мастеры",
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
        <PaymentForm
          closeModal={closeModal}
          control={control}
          handleSubmit={handleSubmit}
          handlePaymentFormSubmit={handlePaymentFormSubmit}
        />
      </Modal>

      <Modal
        isOpen={isReturnOpen}
        onClose={closeReturnModal}
        className="max-w-146 p-4 lg:p-6"
        title="Оформить возврат"
      >
        <RefundForm
          closeModal={closeReturnModal}
          control={refundControl}
          handleRefundSubmit={handleRefundSubmit}
          handleRefundFormSubmit={handleRefundFormSubmit}
        />
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
              disabled={visit.debtAmount === 0}
              startIcon={<Plus size="18" />}
              onClick={openModal}
            >
              Принят оплату
            </Button>
          </div>
        </div>

        <hr />

        <DataTable
          columns={columns}
          data={visit.items}
          rowClassName={(row) =>
            row.quantity === 0 ? "opacity-30 bg-gray-50" : ""
          }
        />

        {visit.payments.length > 0 && (
          <>
            <div className="text-lg font-semibold">История оплат</div>
            <DataTable columns={paymentColumns} data={visit.payments} />
          </>
        )}
      </ComponentCard>
    </>
  );
};

export default ClientVisitPage;
