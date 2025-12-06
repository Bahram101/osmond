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
import ArrivalForm from "./components/ArrivalForm";
import { useForm } from "react-hook-form";
import { IArrivalForm, IArrivalRequest } from "@/types/arrival.interface";
import { useCreateArrival } from "@/hooks/arrival/useArrival";

const ProductsPage = () => {
  const { control, handleSubmit, reset } = useForm<IArrivalForm>();
  const { isOpen, openModal, closeModal } = useModal();
  const { products, isFetchingProducts } = useGetProducts();
  const { createArrival, isCreatingArrival } = useCreateArrival();
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [arrivalProduct, setArrivalProduct] = useState<IProduct | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Точно удалить товар?")) {
      deleteProduct(id);
      setDeletingId(id);
    }
  };

  const columnHelper = createColumnHelper<IProduct>();

  const handleOpenModal = (currentProduct: any) => {
    setArrivalProduct(currentProduct.original);
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
      cell: ({ row }) => {
        return (
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
            <Button
              variant="warning"
              size="tiny"
              onClick={() => handleOpenModal(row)}
            >
              Приход
            </Button>
          </div>
        );
      },
    }),
  ];

  const handleArrivalFormSubmit = (data: IArrivalForm) => {
    if (!arrivalProduct) return;
    const body: IArrivalRequest = {
      productId: arrivalProduct?.id,
      qty: Number(data.qty),
      note: data.note,
    };
    createArrival(body, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <div className="col-span-12 xl:col-span-7">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-4 lg:p-6"
        title="Приход товара"
      >
        <ArrivalForm
          closeModal={closeModal}
          control={control}
          arrivalProduct={arrivalProduct}
          handleSubmit={handleSubmit}
          handleArrivalFormSubmit={handleArrivalFormSubmit}
        />
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
