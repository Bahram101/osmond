"use client";
import React from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import { Pencil, Plus } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Link from "next/link";
import { useGetProducts } from "@/hooks/product/useProducts";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { IProduct } from "@/types/product.interface";

const ProductsPage = () => {
  const { products, isFetchingProducts } = useGetProducts();

  const columnHelper = createColumnHelper<IProduct>();

  const columns: ColumnDef<IProduct, any>[] = [
    columnHelper.accessor("name", {
      header: "Название",
    }),
    columnHelper.accessor("description", {
      header: "Описании",
    }),   
    columnHelper.accessor((row) => row.category.name ?? "-", {
      id: "category.name",
      header: "Категория"
    }), 
     columnHelper.accessor("published", {
      header: "Опубликован",
      cell: ({ getValue }) => (getValue() ? "Да" : "Нет"),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      size: 260,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-3">
            <Button
              variant="danger"
              size="tiny"
              // onClick={() => handleDelete(row.original.id!)}
            >
              {/* {isDeleting && deletingId === row.original.id ? (
                <Loader />
              ) : (
                <Trash2 className="size-4" />
              )} */}
              Удалить
            </Button>
            <Link href={`/admin/products/edit/${row.original.id}`}>
              <Button variant="primary" size="tiny">
                <Pencil className="size-4" />
                Редактировать
              </Button>
            </Link>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Товары" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Recent Orders</h3>

          <Link href="/admin/products/create">
            <Button size="xs" variant="primary" startIcon={<Plus />}>
              Создать
            </Button>
          </Link>
        </div>

        {isFetchingProducts ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={products} />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
