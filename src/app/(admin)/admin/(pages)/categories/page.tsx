"use client";
import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "../../components/common/BreadCrumb";
import Button from "../../components/ui/button/Button";
import {
  useDeleteCategory,
  useGetCategories,
} from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ICategory } from "@/types/category.interface";

const Categories = () => {
  const { categories, isFetchingCategories} = useGetCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Точно удалить категорию?")) {
      deleteCategory(id);
      setDeletingId(id);
    }
  };

  const columnHelper = createColumnHelper<ICategory>();

  const columns: ColumnDef<ICategory, any>[] = [
    columnHelper.accessor("name", {
      header: "Название",
    }),
    columnHelper.accessor((row) => row.parent?.name ?? "—", {
      id: "parent.name",
      header: "Род. категория",
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
              onClick={() => handleDelete(row.original.id!)}
            >
              {isDeleting && deletingId === row.original.id ? (
                <Loader />
              ) : (
                <Trash2 className="size-4" />
              )}
              Удалить
            </Button>
            <Link href={`/admin/categories/edit/${row.original.id}`}>
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
        items={[{ label: "Home", href: "/admin" }, { label: "Категория" }]}
      />

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
          <DataTable columns={columns} data={categories} />
        )}
      </div>
    </div>
  );
};

export default Categories;
