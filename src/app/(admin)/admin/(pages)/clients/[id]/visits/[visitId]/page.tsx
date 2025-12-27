"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard"; 
import { DataTable } from "@/components/common/DataTable";
import Loader from "@/components/shared/Loader";
import { useGetClient } from "@/hooks/client/useClient";
import { useGetVisit } from "@/hooks/visit/useVisit";  
import { VisitDetailItem } from "@/types/visit.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useParams } from "next/navigation"; 
import VisitSummary from "./components/VisitSummary";

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
        <VisitSummary visit={visit}/>
        <hr />
        <DataTable columns={columns} data={visit?.items} />
      </ComponentCard>
    </>
  );
};

export default ClientVisitPage;
