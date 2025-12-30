"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";
import { useGetClient } from "@/hooks/client/useClient";
import { useGetProducts } from "@/hooks/product/useProducts";
import { IProductSelect } from "@/types/product.interface";
import { Check, Plus, Trash2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ProductSelectTable } from "./components/ProductSelectTable";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { VisitItemForm } from "@/types/visit.interface";
import { useCreateVisit } from "@/hooks/visit/useVisit";
import { Input } from "@/components/ui/input";

const VisitCreatePage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { isOpen, openModal, closeModal } = useModal();
  const { products, isFetchingProducts } = useGetProducts();
  const { createVisit, isCreatingVisit } = useCreateVisit();
  const [items, setItems] = useState<VisitItemForm[]>([]);

  if (Number.isNaN(clientId)) return null;

  const { client, isLoadingClient } = useGetClient(clientId);

  const productsForSelect: IProductSelect[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.quantity,
    price: p.price,
  }));

  const onSelectProduct = (product: IProductSelect) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.productId === product.id);

      if (exists) return prev;

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
        },
      ];
    });
  };

  const handleSaveVisit = () => {
    createVisit(
      { clientId, items },
      {
        onSuccess: () => {
          router.push(`/admin/clients/${clientId}`);
        },
      }
    );
  };

  // const handleDeleteItem = (id) =>{

  // }

  const columnHelper = createColumnHelper<VisitItemForm>();

  const columns: ColumnDef<VisitItemForm>[] = [
    {
      accessorKey: "name",
      header: "Название товара",
    },
    {
      accessorKey: "price",
      header: "Цена",
    },
    {
      accessorKey: "quantity",
      header: "Кол-во",
      cell: ({ row }) => {
        return (
          <div className='flex justify-center'>
            <Input
              type="number"
              min={1}
              className="w-20 border text-center"
              value={row.original.quantity}
              onChange={(e) => {
                console.log("onChange");
                const qty = Number(e.target.value);

                setItems((prev) =>
                  prev.map((item, idx) =>
                    idx === row.index ? { ...item, quantity: qty } : item
                  )
                );
              }}
            />
          </div>
        );
      },
    },
    {
      id: "total",
      header: "Сумма",
      cell: ({ row }) => {
        const price = row.original.price;
        const qty = row.original.quantity ?? 0;
        return <span>{qty * price}</span>;
      },
    },
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 260,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-3">
            <div className="cursor-pointer" onClick={() => console.log("del")}>
              <Trash2 className="size-4.5" color="red" />
            </div>
          </div>
        );
      },
    }),
  ];

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
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Выберите товар"
      >
        <ProductSelectTable
          products={productsForSelect}
          onSelect={onSelectProduct}
        />
      </Modal>

      <div className="grid xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ComponentCard title={client?.fullName}>
            <DataTable columns={columns} data={items} />

            <div className="border-t border-gray-100 pt-5 flex justify-between">
              <Button
                size="xs"
                variant="primary"
                startIcon={<Plus size="18" />}
                onClick={openModal}
              >
                Выбрать товар
              </Button>
              <div className="space-x-2">
                <Button size="xs" variant="outline" startIcon={<X size="18" />}>
                  Отмена
                </Button>
                <Button
                  size="xs"
                  variant="success"
                  startIcon={<Check size="18" />}
                  onClick={handleSaveVisit}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default VisitCreatePage;
