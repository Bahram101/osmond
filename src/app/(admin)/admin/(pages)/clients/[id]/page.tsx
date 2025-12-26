"use client";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Link from "next/link";
import Button from "../../../components/ui/button/Button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VisitTab from "./components/tabs/VisitTab";
import HistoryTab from "./components/tabs/HistoryTab";
import InfoTab from "./components/tabs/InfoTab";
import { useParams } from "next/navigation";
import { useGetClient } from "@/hooks/client/useClient"; 

const ClientViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  if (Number.isNaN(clientId)) return null;

  const { client } = useGetClient(clientId);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Клиенты", href: "/admin/clients" },
          { label: client?.fullName ?? "Клиент" },
        ]}
      />

      <div className="col-span-12 xl:col-span-7">
        <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
          <div className="flex justify-between items-center pb-5">
            <h3 className="text-lg">Данные о клиента</h3>

            <Link href={`/admin/clients/${clientId}/visits/create`}>
              <Button
                size="xs"
                variant="primary"
                startIcon={<Plus size="18" />}
              >
                Новый визит (долг)
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="visit">
            <TabsList className="mb-3">
              <TabsTrigger value="visit">Визиты / Долги</TabsTrigger>
              <TabsTrigger value="history">История оплат</TabsTrigger>
              <TabsTrigger value="info">Информация</TabsTrigger>
            </TabsList>

            <TabsContent value="visit">
              <VisitTab />
            </TabsContent>

            <TabsContent value="history">
              <HistoryTab />
            </TabsContent>

            <TabsContent value="info">
              <InfoTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ClientViewPage;
