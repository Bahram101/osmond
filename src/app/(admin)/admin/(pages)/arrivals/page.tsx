"use client";
import { useGetArrivals } from "@/hooks/arrival/useArrival";
import { IArrival, Type } from "@/types/arrival.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import { formatCurrency } from "@/lib/utils/helpers";

const ArrivalsPage = () => {
  const { arrivals, isFetchingArrivals } = useGetArrivals();

  const columnHelper = createColumnHelper<IArrival>();

  const columns: ColumnDef<IArrival, any>[] = [
    columnHelper.accessor((row) => row.product?.name ?? "-", {
      id: "product.name",
      header: "Название товара",
    }),
    columnHelper.accessor("qty", {
      header: "Количество",
      cell: (row) => {
        return <div className="text-center">{row.getValue()}</div>;
      },
    }),
    columnHelper.accessor("purchasePrice", {
      header: "Цена покупки",
      cell: ({ row }) => {
        const price = row.original.purchasePrice ?? 0;
        return <div className="text-center">{formatCurrency(price)}</div>;
      },
    }),
    columnHelper.accessor("type", {
      header: "Тип",
      cell: ({ getValue }) => {
        const value = getValue() as Type;
        return (
          <div className="text-center">
            {value === "IN" ? "Приход" : "Списание"}
          </div>
        );
      },
    }),
    columnHelper.accessor("note", {
      header: "Заметки",
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата",
      cell: ({ getValue }) => {
        return (
          <div className="text-center">
            {new Date(getValue()).toLocaleDateString("ru-RU")}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Движение товаров" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список движений товаров</h3>
        </div>

        {isFetchingArrivals ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={arrivals} />
        )}
      </div>
    </div>
  );
};

export default ArrivalsPage;
