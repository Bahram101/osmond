"use client";
import React, { useState } from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Link from "next/link";
import { useDeleteProduct, useGetProducts } from "@/hooks/product/useProducts";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { IProduct } from "@/types/product.interface";
import Badge from "../../components/ui/badge/Badge";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { products, isFetchingProducts } = useGetProducts();
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Точно удалить товар?")) {
      deleteProduct(id);
      setDeletingId(id);
    }
  };

  const columnHelper = createColumnHelper<IProduct>();

  const handleOpenModal = () => {
    console.log("open modal");
    openModal();
  };

  const columns: ColumnDef<IProduct, any>[] = [
    columnHelper.accessor("name", {
      header: "Название",
    }),
    columnHelper.accessor((row) => row.category?.name ?? "-", {
      id: "category.name",
      header: "Категория",
    }),
    columnHelper.accessor("price", {
      header: "Цена",
    }),
    columnHelper.accessor("quantity", {
      header: "Количество",
    }),
    columnHelper.accessor("barcode", {
      header: "Штрих-код",
    }),
    columnHelper.accessor("description", {
      header: "Описание",
    }),
    columnHelper.accessor("published", {
      header: "Опубликован",
      cell: ({ getValue }) => {
        const value = getValue();
        const color = value ? "success" : "light";
        const text = value ? "Да" : "Нет";
        return (
          <Badge size="sm" color={color}>
            {text}
          </Badge>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата создания",
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("ru-RU"),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      size: 170,
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Button
            variant="danger"
            size="tiny"
            onClick={() => handleDelete(row.original.id)}
          >
            {isDeletingProduct && deletingId === row.original.id ? (
              <Loader />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
          <Link href={`/admin/products/edit/${row.original.id}`}>
            <Button variant="primary" size="xs">
              <Pencil className="size-4" />
            </Button>
          </Link>
          <Button variant="warning" size="tiny" onClick={handleOpenModal}>
            Приход
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>First Name</Label>
              <Input type="text" placeholder="Emirhan" />
            </div>

            <div className="col-span-1">
              <Label>Last Name</Label>
              <Input type="text" placeholder="Boruch" />
            </div>

            <div className="col-span-1">
              <Label>Last Name</Label>
              <Input type="email" placeholder="emirhanboruch55@gmail.com" />
            </div>

            <div className="col-span-1">
              <Label>Phone</Label>
              <Input type="text" placeholder="+09 363 398 46" />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Label>Bio</Label>
              <Input type="text" placeholder="Team Manager" />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Товары" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Товары</h3>

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
