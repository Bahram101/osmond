"use client";
import { useState } from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import {
  EllipsisVertical,
  Pencil,
  Plus,
  ScanBarcode,
  Trash2,
  Van,
} from "lucide-react";
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
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<IArrivalForm>();
  const { isOpen, openModal, closeModal } = useModal();
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const { products, isFetchingProducts } = useGetProducts();
  const { createArrival, isCreatingArrival } = useCreateArrival();
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [arrivalProduct, setArrivalProduct] = useState<IProduct | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Точно удалить товар?")) {
      deleteProduct(id);
      setDeletingId(id);
    }
  };

  const handleOpenModal = (currentProduct: any) => {
    setArrivalProduct(currentProduct.original);
    openModal();
  };

  function toggleDropdown(data: IProduct) {
    setOpenRowId((prev) => (prev === data.id ? null : data.id));
  }

  function closeDropdown() {
    setOpenRowId(null);
  }

  const columnHelper = createColumnHelper<IProduct>();

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
      size: 50,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => toggleDropdown(row.original)}
              className="dropdown-toggle"
            >
              <EllipsisVertical className="cursor-pointer" />
            </button>
            <Dropdown
              isOpen={openRowId === row.original.id}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onClick={() => handleOpenModal(row)}
                onItemClick={closeDropdown}
                className="action-button"
              >
                <div className="flex justify-between items-center pl-0">
                  <Van className="size-4" color="green" />
                  <p className="ml-2">Оприходовать</p>
                </div>
              </DropdownItem>

              <DropdownItem
                onClick={() => handleOpenModal(row)}
                onItemClick={closeDropdown}
                className="action-button"
              >
                <div className="flex justify-between items-center pl-0">
                  <ScanBarcode className="size-4" />
                  <p className="ml-2">Распечатать</p>
                </div>
              </DropdownItem>

              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  router.push(`/admin/products/edit/${row.original.id}`);
                }}
                className="action-button"
              >
                <div className="flex justify-between items-center pl-0">
                  <Pencil className="size-4" color="blue" />
                  <p className="ml-2">Изменить</p>
                </div>
              </DropdownItem>

              <DropdownItem
                onClick={() => handleDelete(row.original.id)}
                onItemClick={closeDropdown}
                className="action-button"
              >
                <div className="flex justify-between items-center pl-0">
                  <Trash2 className="size-4" color="red" />
                  <p className="ml-2">Delete</p>
                </div>
              </DropdownItem>
            </Dropdown>
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
        className="max-w-146 p-4 lg:p-6"
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
          <h3 className="text-lg">Список товаров</h3>

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
