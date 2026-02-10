"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetVisit } from "@/hooks/visit/useVisit";
import { useParams, useRouter } from "next/navigation";
import VisitSummary from "./components/VisitSummary";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { ArrowLeft, Plus } from "lucide-react";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";
import PaymentForm from "./components/PaymentForm";
import { useForm } from "react-hook-form";
import { PaymentFormValues, PaymentCreateDTO } from "@/types/payment.interface";
import { useCreatePayment } from "@/hooks/payment/usePayments";
import { useEffect, useState } from "react";
import { visitColumns, paymentColumns } from "./components/VisitColumns";
import { VisitDetailItem } from "@/types/visit.interface";

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

  const columns = visitColumns({
    onReturn: (item) => {
      setSelectedItem(item);
      openReturnModal();
    },
  });

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
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Сделать возврат"
      >
        <PaymentForm
          closeModal={closeModal}
          control={control}
          handleSubmit={handleSubmit}
          handlePaymentFormSubmit={handlePaymentFormSubmit}
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
