"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import { useGetClient } from "@/hooks/client/useClient";
import { useParams } from "next/navigation";
import React from "react";

const ClientVisitPage = () => {
  const { id, visitId } = useParams<{ id: string; visitId: string }>();
  const clientId = Number(id);
  const visId = Number(visitId);
  if (Number.isNaN(clientId)) return null;

  const { client } = useGetClient(clientId);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Клиенты", href: "/admin/clients" },
          { label: client?.fullName ?? "Клиент", href: `/admin/clients/${id}`},
          { label: `Визит №${visId}`},
        ]}
      />
      <div>ClientVisitPage</div>
    </>
  );
};

export default ClientVisitPage;
