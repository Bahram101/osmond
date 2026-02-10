"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { Modal } from "@/app/(admin)/admin/components/ui/modal";
import { useModal } from "@/app/(admin)/admin/hooks/useModal";
import { useGetClient, useGetClients } from "@/hooks/client/useClient";
import {
  useGetProductByBarcode,
  useGetProducts,
} from "@/hooks/product/useProducts";
import { ProductCreateDTO, ProductShortDTO } from "@/types/product.interface";
import { ArrowLeft, Check, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useParams, useRouter, usePathname } from "next/navigation";
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
import Label from "../../../components/form/Label";
import Loader from "@/components/shared/Loader";
import { Controller, useForm } from "react-hook-form";
import Field from "@/components/shared/field/Field";
import FormRadioGroup from "@/components/shared/radio/Radio";
import { Selector } from "@/components/shared/select/SelectSearch";

const VisitCreatePage = () => {
  const VISIT_FORM_DEFAULTS = {
    clientId: null,
    clientType: null,
    paymentType: null,
    fullName: "",
    phone: "",
    note: "",
  };
  const router = useRouter();
  const { control, setValue, handleSubmit, reset, watch } =
    useForm<VisitFormValues>({
      mode: "all",
      defaultValues: VISIT_FORM_DEFAULTS,
    });
  const [clientId, clientType, paymentType, fullName, phone, note] = watch([
    "clientId",
    "clientType",
    "paymentType",
    "fullName",
    "phone",
    "note",
  ]);
  const { isOpen, openModal, closeModal } = useModal();
  const { createVisit, isCreatingVisit } = useCreateVisit();
  const { products, isFetchingProducts } = useGetProducts();
  const { clients, isFetchingClients } = useGetClients();
  const [items, setItems] = useState<VisitItemForm[]>([]);
  const [barcode, setBarcode] = useState("");
  const [isCreateClient, setIsCreateClient] = useState<boolean>(false);
  const isWalkDebt = paymentType === "debt" && clientType === "WALK_IN";
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

  useEffect(() => {
    if (isWalkDebt && !clientId) {
      setValue("clientId", null);
    }
    setValue("fullName", "");
    setValue("phone", "");
    setValue("note", "");
    setIsCreateClient(false);
  }, [clientType, paymentType]);

  const clientOptions = clients
    .map((client) => ({
      value: client.id ?? null,
      label: client.fullName,
      type: client.type,
      id: client.id,
    }))
    .filter((item) => item.type === clientType && item.id !== 1);

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

  const handleSaveVisit = () => {
    const isDebt = paymentType === "debt";

    createVisit(
      {
        clientId,
        items,
        payNow: paymentType === "pay_now",
        walkInClient:
          !clientId && isDebt
            ? {
                fullName: fullName?.trim()!,
                note: note?.trim() ?? "",
                phone: phone?.trim() ?? "",
              }
            : null,
      },
      {
        onSuccess: () => {
          router.push(`/admin/sales`);
        },
      },
    );
  };

  const handleClearCart = () => {
    if (confirm("Хотите очистить корзину?")) {
      setItems([]);
      reset(VISIT_FORM_DEFAULTS);
    }
  };

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

  const columns: ColumnDef<VisitItemForm>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Название товара",
        meta: { className: "w-2/10" },
      },
      {
        accessorKey: "price",
        header: "Цена",
        meta: { className: "w-1/10" },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <Input
                className="w-20 border text-center"
                value={row.original.price}
                onChange={(e) => {
                  setItems((prev) =>
                    prev.map((item, idx) =>
                      idx === row.index
                        ? { ...item, price: Number(e.target.value) }
                        : item,
                    ),
                  );
                }}
              />
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
        accessorKey: "servicePrice",
        header: "За работу",
        meta: { className: "w-2/10" },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <Input
                className="w-20 border text-center"
                value={row.original.servicePrice ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setItems((prev) =>
                    prev.map((item, idx) =>
                      idx === row.index
                        ? {
                            ...item,
                            servicePrice:
                              value === "" ? null : Number(e.target.value),
                          }
                        : item,
                    ),
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
        meta: { className: "w-1/10" },
        cell: ({ row }) => {
          const price = row.original.price;
          const servicePrice = row.original.servicePrice
          const qty = row.original.quantity ?? 0;
          return (
            <div className="text-center">{formatCurrency(qty * price + (servicePrice || 0))}</div>
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

          <hr className="pb-5 sm:pb-5" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 mb-5 mt-3">
            <div className="flex gap-5 items-center">
              <FormRadioGroup
                name="clientType"
                control={control}
                rules={{ required: true }}
                options={[
                  { label: "Клиент", value: "WALK_IN" },
                  { label: "Мастер", value: "MASTER" },
                  { label: "Оптовик", value: "WHOLESALER" },
                ]}
              />
            </div>
            <div className="w-full md:w-2/3 sm:w-full">
              {false ? (
                <Loader />
              ) : (
                <div className="w-2/3">
                  <Selector
                    name="clientId"
                    control={control}
                    rules={{
                      validate: (value: any) => {
                        if (
                          clientType !== "WALK_IN" &&
                          paymentType === "debt" &&
                          !value
                        ) {
                          return "Выберите клиента";
                        }
                        return true;
                      },
                    }}
                    options={clientOptions}
                    disabled={isCreateClient}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 mb-8">
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

          <div className="flex flex-col gap-5">
            {isCreateClient && isWalkDebt && (
              <div className="flex flex-col gap-5 w-full sm:w-1/3">
                <div>
                  <Label htmlFor="fullName">Имя клиента</Label>
                  <Field
                    name="fullName"
                    control={control}
                    rules={{
                      required: "Заполните поле",
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Field name="phone" control={control} />
                </div>
                <div>
                  <Label htmlFor="note">Заметка</Label>
                  <Field name="note" control={control} />
                </div>
              </div>
            )}

            <hr />

            <div className="footer-top flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex gap-3">
                <Button
                  size="xs"
                  variant="warning"
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
                {!clientId && isWalkDebt && (
                  <Button
                    size="xs"
                    variant="outline"
                    startIcon={<Plus size="18" />}
                    onClick={() => setIsCreateClient(true)}
                  >
                    Клиент
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-4 sm:flex sm:flex-row">
                <div className="flex gap-2">
                  <FormRadioGroup
                    name="paymentType"
                    control={control}
                    rules={{ required: true }}
                    options={[
                      { label: "В долг", value: "debt" },
                      { label: "Оплатить сейчас", value: "pay_now" },
                    ]}
                  />
                </div>
                <Button
                  size="xs"
                  variant="success"
                  startIcon={<Check size="18" />}
                  onClick={handleSubmit(handleSaveVisit, (errors) => {
                    console.log("FORM ERRORS", errors);
                  })}
                  disabled={!isSelectedProducts}
                >
                  Продать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitCreatePage;
