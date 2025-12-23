"use client";
import { useSale } from "@/hooks/sale/useSale";
import { ISale } from "@/types/sale.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";

const SalesPage = () => {
  const { sales, isFetchingSales } = useSale();

  const columnHelper = createColumnHelper<ISale>();

  const columns: ColumnDef<ISale, any>[] = [
    columnHelper.accessor((row) => row.product?.name ?? "-", {
      id: "product.name",
      header: "Название товара",
    }),
    columnHelper.accessor("quantity", {
      header: "Количество",
      cell: (row) => {
        return <div className="text-center">{row.getValue()}</div>;
      },
    }),
    columnHelper.accessor("price", {
      header: "Цена",
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата продажи",
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
        items={[{ label: "Home", href: "/admin" }, { label: "Продажа" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список проданных товаров</h3>
        </div>

        {isFetchingSales ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={sales} />
        )}
      </div>
    </div>
  );
};

export default SalesPage;
