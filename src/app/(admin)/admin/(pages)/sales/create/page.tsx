"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";
import { useGetClient } from "@/hooks/client/useClient";
import {
  useGetProductByBarcode,
  useGetProducts,
} from "@/hooks/product/useProducts";
import { ProductCreateDTO, ProductShortDTO } from "@/types/product.interface";
import { ArrowLeft, Check, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductSelectTable } from "./components/ProductSelectTable";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { VisitFormValues, VisitItemForm } from "@/types/visit.interface";
import { useCreateVisit } from "@/hooks/visit/useVisit";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import EmptyState from "@/app/(admin)/admin/components/ui/EmptyState";
import { formatCurrency } from "@/lib/utils/helpers";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";
import Loader from "@/components/shared/Loader";
import ControlledSelect from "@/components/shared/select/Select";
import { useForm } from "react-hook-form";

const VisitCreatePage = () => {
  const router = useRouter();
  const { control, setValue, handleSubmit, reset, watch } =
    useForm<VisitFormValues>({
      defaultValues: {
        clientId: null,
        clientType: null,
        paymentType: null,
      },
    });
  const [clientType, paymentType] = watch(["clientType", "paymentType"]);
  const { isOpen, openModal, closeModal } = useModal();
  const { createVisit, isCreatingVisit } = useCreateVisit();
  const { products, isFetchingProducts } = useGetProducts();
  const [items, setItems] = useState<VisitItemForm[]>([]);
  const [barcode, setBarcode] = useState("");
  const { getProductByBarcode, isFetchingProdByBarcode } =
    useGetProductByBarcode();
  const inputRef = useRef<HTMLInputElement>(null);

  const isSelectedProducts = items.length > 0;

  const successSound = useRef<HTMLAudioElement | null>(null);
  const errorSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    successSound.current = new Audio("/sounds/beep.mp3");
    errorSound.current = new Audio("/sounds/error.wav");
  }, []);

  const productsForSelect: ProductShortDTO[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.quantity,
    price: p.price,
  }));

  const onSelectProduct = (product: ProductShortDTO) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.productId === product.id);

      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  // const handleSaveVisit = () => {
  //   createVisit(
  //     { clientId, items },
  //     {
  //       onSuccess: () => {
  //         router.push(`/admin/clients/${clientId}`);
  //       },
  //     },
  //   );
  // };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => {
      return prev.filter((item) => item.productId !== id);
    });
  };

  const handleScan = async (code: string) => {
    if (!code || isFetchingProdByBarcode) return;

    try {
      const product = await getProductByBarcode(code);
      onSelectProduct(product);
      successSound.current?.play();
    } catch (error: any) {
      errorSound.current?.play();

      if (error?.status === 409) {
        toast.error("Нет на складе");
      } else if (error.status === 404) {
        toast.error("Товар не найден");
      } else {
        toast.error("Ошибка сканирования");
      }
    } finally {
      setBarcode("");
      inputRef.current?.focus();
    }
  };

  const handleClearCart = () => {
    setItems([]);
  };

  const columns: ColumnDef<VisitItemForm>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Название товара",
        meta: { className: "w-3/10" },
      },
      {
        accessorKey: "price",
        header: "Цена",
        meta: { className: "w-1/10" },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              {formatCurrency(row.original.price)}
            </div>
          );
        },
      },
      {
        accessorKey: "quantity",
        header: "Кол-во",
        meta: { className: "w-3/10" },
        cell: ({ row }) => {
          const product = products.find((p) => p.id === row.original.productId);

          return (
            <div className="flex justify-between items-center gap-4">
              <Input
                type="number"
                min={1}
                max={product?.quantity}
                className="w-20 border text-center"
                value={row.original.quantity}
                onChange={(e) => {
                  const raw = Number(e.target.value);
                  const stock = product?.quantity;
                  const qty = stock ? Math.max(1, Math.min(raw, stock)) : 1;

                  setItems((prev) =>
                    prev.map((item, idx) =>
                      idx === row.index ? { ...item, quantity: qty } : item,
                    ),
                  );
                }}
              />
              <div className="">
                <span>Остаток: </span>
                <span className="font-semibold">
                  {Number(product?.quantity) - row.original.quantity} шт
                </span>
              </div>
            </div>
          );
        },
      },
      {
        id: "total",
        header: "Сумма",
        meta: { className: "w-1/10" },
        cell: ({ row }) => {
          const price = row.original.price;
          const qty = row.original.quantity ?? 0;
          return (
            <div className="text-center">{formatCurrency(qty * price)}</div>
          );
        },
      },
      ...(isSelectedProducts
        ? [
            {
              id: "actions",
              header: () => null,
              size: 260,
              meta: { className: "w-1/10" },
              cell: ({ row }: { row: any }) => {
                return (
                  <div className="flex justify-center gap-3">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDeleteItem(row.original.productId)}
                    >
                      <Trash2 className="size-4.5" color="red" />
                    </div>
                  </div>
                );
              },
            },
          ]
        : []),
    ];
  }, [isSelectedProducts, products]);

  console.log("clientType", clientType);

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Продажи", href: "/admin/sales" },
          { label: "Новая продажа" },
        ]}
      />
      <input
        ref={inputRef}
        autoFocus
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleScan(barcode);
            setBarcode("");
          }
        }}
        className="absolute opacity-0 pointer-events-none"
        // className="border border-black"
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
          closeModal={closeModal}
        />
      </Modal>

      <div className="grid 2xl:grid-cols-3">
        <div className="2xl:col-span-2 rounded-2xl bg-white p-3 md:p-6">
          <div className="flex gap-3 flex-row justify-between items-center pb-5">
            <h3 className="text-lg">Новый визит</h3>
            <Button
              size="xs"
              variant="outline"
              startIcon={<ArrowLeft size="18" />}
              onClick={() => router.push(`/admin/sales`)}
            >
              Назад
            </Button>
          </div>
          <hr className="pb-3 sm:pb-5" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 mb-5">
            <div className="flex gap-5 items-center">
              <Radio
                id="master"
                name="clientType"
                value="master"
                checked={clientType === "master"}
                onChange={() => setValue("clientType", "master")}
                label="Мастер"
              />
              <Radio
                id="client"
                name="clientType"
                value="client"
                checked={clientType === "client"}
                onChange={() => setValue("clientType", "client")}
                label="Клиент"
              />
              <Radio
                id="wholesaler"
                name="clientType"
                value="wholesaler"
                checked={clientType === "wholesaler"}
                onChange={() => setValue("clientType", "wholesaler")}
                label="Оптовик"
              />
            </div>
            <div className="w-full md:w-2/3 sm:w-full">
              {false ? (
                <Loader />
              ) : (
                <div className="w-2/3">
                  <ControlledSelect<VisitFormValues, number | null>
                    name="clientId"
                    valueType="number"
                    control={control}
                    rules={{ required: "Заполните поле" }}
                    options={[]}
                    placeholder="Выберите"
                  />
                </div>
              )}
            </div>
          </div>


          <div className="mb-8">
            {items.length > 0 ? (
              <DataTable columns={columns} data={items} />
            ) : (
              <div className="flex flex-col">
                <EmptyState
                  icon={<ShoppingCart />}
                  text="Выберите товар для визита"
                />
                <span className="text-sm text-gray-400 text-center">
                  Нажмите "Выбрать товар"
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                size="xs"
                variant="outline"
                startIcon={<X size="18" />}
                onClick={handleClearCart}
              >
                Очистить корзину
              </Button>
              <Button
                size="xs"
                variant="primary"
                startIcon={<Plus size="18" />}
                onClick={openModal}
              >
                Выбрать товар
              </Button>
            </div>
            <div className="flex gap-3">
              <Radio
                id="debt"
                name="paymentType"
                value="debt"
                checked={paymentType === "debt"}
                onChange={() => setValue("paymentType", "debt")}
                label="В долг"
              />
              <Radio
                id="pay_now"
                name="paymentType"
                value="pay_now"
                checked={paymentType === "pay_now"}
                onChange={() => setValue("paymentType", "pay_now")}
                label="Оплатить сейчас"
              />
              <Button
                size="xs"
                variant="success"
                startIcon={<Check size="18" />}
                // onClick={handleSaveVisit}
                disabled={!isSelectedProducts}
              >
                Продать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitCreatePage;
