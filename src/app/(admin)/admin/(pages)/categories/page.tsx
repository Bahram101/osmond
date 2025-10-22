"use client";
import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Table from "rc-table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { useGetCategories } from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { ICategory } from "@/types/category.interface";

const Categories = () => {
  const { categories, isFetchingCategories } = useGetCategories();

  const columnHelper = createColumnHelper<ICategory>();

  const columns = [
    {
      accessorKey: "name",
      header: "Название",
    },
    columnHelper.accessor(row => row.parent?.name ?? "—", {
      header: "Род. категория",
      id: "parent.name",
      size: 100,
      cell: info => info.getValue(),
    }),
  ];


  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb pageTitle="Категория" />

      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список категории</h3>
          <Link href="/admin/categories/create">
            <Button size="xs" variant="primary" startIcon={<Plus />}>
              Создать
            </Button>
          </Link>
        </div>
        {isFetchingCategories ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={categories}
              tableLayout="fixed"
              rowKey={(record: any) => record.id}
              style={{ width: "100%", minWidth: "1000px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
