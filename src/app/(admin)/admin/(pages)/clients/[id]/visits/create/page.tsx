"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClient } from "@/hooks/client/useClient";
import { useParams } from "next/navigation";

const VisitCreatePage = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  if (Number.isNaN(clientId)) return null;

  const { client, isFetchingClient } = useGetClient(clientId);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Клиенты", href: "/admin/clients" },
          {
            label: client?.fullName ?? "Клиент",
            href: `/admin/clients/${client?.id}`,
          },
          { label: "Новый визит" },
        ]}
      />
      {/* <div className="col-span-12 xl:col-span-7">
        <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
          <div className="flex justify-between items-center pb-5">
            <h3 className="text-xl font-semibold">{client?.fullName}</h3>
          </div>
          <div className="grid xl:grid-cols-2">
            <ComponentCard title="Создание товара">sdf</ComponentCard>
          </div>
        </div>
      </div> */}
      <div className="grid xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ComponentCard title={client?.fullName}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell>Кол-во</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>А35</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3000</TableCell>
                  <TableCell>6000</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ACB</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>12000</TableCell>
                  <TableCell>12000</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default VisitCreatePage;
