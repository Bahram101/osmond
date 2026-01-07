"use client";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Link from "next/link";
import Button from "../../../components/ui/button/Button";
import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VisitTab from "./components/tabs/VisitTab";
import HistoryTab from "./components/tabs/HistoryTab";
import InfoTab from "./components/tabs/InfoTab";
import { useParams, useRouter } from "next/navigation";
import { useGetClient } from "@/hooks/client/useClient";
import { useGetClientVisits } from "@/hooks/visit/useVisit";
import { formatCurrency } from "@/lib/utils/helpers";

const ClientViewPage = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  if (Number.isNaN(clientId)) return null;
  const { clientVisits = [], isLoadingClientVisits } =
    useGetClientVisits(clientId);

  const { client } = useGetClient(clientId);

  const totalDebt = clientVisits.reduce((acc, visit) => acc + visit.debtAmount, 0)

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Мастеры", href: "/admin/clients" },
          { label: client?.fullName ?? "Мастер" },
        ]}
      />

      <div className="col-span-12 xl:col-span-7">
        <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center pb-5  ">
            <h3 className="text-lg">Данные о мастера</h3>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="outline"
                startIcon={<ArrowLeft size="18" />}
                onClick={() => router.push(`/admin/clients`)}
              >
                Назад
              </Button>
              <Link href={`/admin/clients/${clientId}/visits/create`}>
                <Button
                  size="xs"
                  variant="success"
                  startIcon={<Plus size="18" />}
                >
                  Новый визит (долг)
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="visit">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="mb-3">
                <TabsTrigger value="visit">Визиты / Долги</TabsTrigger>
                <TabsTrigger value="history">История оплат</TabsTrigger>
                <TabsTrigger value="info">Информация</TabsTrigger>
              </TabsList>

              <div>Общ долг: <span className="font-bold">{formatCurrency(totalDebt)}</span></div>
            </div>

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
