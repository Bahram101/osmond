"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import Badge from "@/app/(admin)/admin/components/ui/badge/Badge";
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetClient } from "@/hooks/client/useClient";
import { useGetVisit } from "@/hooks/visit/useVisit";
import { formatDateTime } from "@/lib/utils/date";
import { formatCurrency } from "@/lib/utils/helpers";
import { VisitDetailItem } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import SummaryItem from "./components/SummaryItem";
import { VISIT_STATUS_COLOR, VISIT_STATUS_LABEL } from "@/lib/constants/visit";

const ClientVisitPage = () => {
  const { id, visitId } = useParams<{ id: string; visitId: string }>();

  const clientId = Number(id);
  const visId = Number(visitId);

  if (Number.isNaN(clientId) || Number.isNaN(visId)) {
    return null;
  }

  const { client } = useGetClient(clientId);
  const { visit, isLoadingVisit } = useGetVisit(visId);

  if (isLoadingVisit) {
    return <Loader />;
  }

  if (!visit) return null;

  const columnHelper = createColumnHelper<VisitDetailItem>();

  const columns: ColumnDef<VisitDetailItem, any>[] = [
    columnHelper.accessor((row) => row.product?.name ?? "-", {
      id: "product.name",
      header: "Товар",
    }),
    { header: "Цена", accessorKey: "price" },
    { header: "Количество", accessorKey: "quantity" },
    {
      header: "Сумма",
      accessorKey: "total",
      // footer: () => <span className="font-semibold">{visit.totalAmount}</span>,
    },
  ];

  console.log("visit", visit);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Клиенты", href: "/admin/clients" },
          { label: client?.fullName ?? "Клиент", href: `/admin/clients/${id}` },
          { label: `Визит №${visId}` },
        ]}
      />

      <ComponentCard>
        <div className="grid grid-cols-6">
          <div className="flex flex-col gap-1">
            <SummaryItem label="Сумма">
              {formatCurrency(visit?.totalAmount)}
            </SummaryItem>

            <SummaryItem label="Оплачено">
              {formatCurrency(visit?.paidAmount)}
            </SummaryItem>

            <SummaryItem label="Долг">
              {formatCurrency(visit?.debtAmount)}
            </SummaryItem>
          </div>
          <div className="flex flex-col gap-1">
            <SummaryItem label="Статус">
              <Badge
                variant="light"
                color={VISIT_STATUS_COLOR[visit.status]}
              >
                {VISIT_STATUS_LABEL[visit.status]}
              </Badge>
            </SummaryItem>
            <SummaryItem label="Дата">
              {formatDateTime(visit?.createdAt)}
            </SummaryItem>
          </div>
          {/* <div>sdf</div>
          <div>sdf</div> */}
        </div>

        <hr />

        <DataTable columns={columns} data={visit?.items} />
      </ComponentCard>
    </>
  );
};

export default ClientVisitPage;
