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
import { ProductResponse } from "@/types/product.interface";
import Badge from "../../components/ui/badge/Badge";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import ArrivalForm from "./components/ArrivalForm";
import { useForm } from "react-hook-form";
import { IArrivalForm, ArrivalCreateDTO } from "@/types/arrival.interface";
import { useCreateArrival } from "@/hooks/arrival/useArrival";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useRouter } from "next/navigation";
import BarcodePreview from "./components/BarcodePreview";
import BarcodePrintSheet from "./components/BarcodePrintSheet";
import { formatCurrency } from "@/lib/utils/helpers";
import { useRef } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import { svg2pdf } from "svg2pdf.js";

const ProductsPage = () => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<IArrivalForm>();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isBarcodeOpen,
    openModal: openBarcodeModal,
    closeModal: closeBarcodeModal,
  } = useModal();

  const [barcodeProduct, setBarcodeProduct] = useState<ProductResponse | null>(
    null,
  );
  const barcodeRef = useRef<HTMLDivElement>(null);
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const { products, isFetchingProducts } = useGetProducts();
  const { createArrival, isCreatingArrival } = useCreateArrival();
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [arrivalProduct, setArrivalProduct] = useState<ProductResponse | null>(
    null,
  );

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

  function toggleDropdown(data: ProductResponse) {
    setOpenRowId((prev) => (prev === data.id ? null : data.id));
  }

  function closeDropdown() {
    setOpenRowId(null);
  }
  console.log(barcodeProduct);

  const columnHelper = createColumnHelper<ProductResponse>();

  const columns: ColumnDef<ProductResponse, any>[] = [
    columnHelper.display({
      id: "rowNumber",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    }),
    // {
    //   header: "Код",
    //   accessorKey: "code",
    //   cell: ({ row }) => <div className="">{row.original.code}</div>,
    // },
    columnHelper.accessor("name", {
      header: "Название",
    }),
    columnHelper.accessor("shortName", {
      header: "Корот. назв.",
    }),
    {
      header: "Цена (Кл.)",
      accessorKey: "price",
      cell: ({ row }) => (
        <div className="">{formatCurrency(row.original.price)}</div>
      ),
    },
    {
      header: "Цена (Мст.)",
      accessorKey: "masterPrice",
      cell: ({ row }) => (
        <div className="">{formatCurrency(row.original.masterPrice)}</div>
      ),
    },
    {
      header: "Цена (Опт.)",
      accessorKey: "wholesalePrice",
      cell: ({ row }) => (
        <div className="">{formatCurrency(row.original.wholesalePrice)}</div>
      ),
    },
    columnHelper.accessor("quantity", {
      header: "Кол-во",
      cell: ({ getValue }) => {
        return <div className="text-center">{getValue()} шт</div>;
      },
    }),
    columnHelper.accessor("barcode", {
      header: "Штрих-код",
      cell: ({ getValue }) => {
        return (
          <div className="flex justify-center items-center">
            <div className="flex gap-3 items-center">
              <ScanBarcode size={18} />
              {getValue()}
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("published", {
      header: "Опубл",
      cell: ({ getValue }) => {
        const value = getValue();
        const color = value ? "success" : "light";
        const text = value ? "Да" : "Нет";
        return (
          <div className="flex justify-center">
            <Badge size="sm" color={color}>
              {text}
            </Badge>
          </div>
        );
      },
    }),
    // columnHelper.accessor("createdAt", {
    //   header: "Дата создания",
    //   cell: ({ getValue }) => (
    //     <div className="text-center">
    //       {new Date(getValue()).toLocaleDateString("ru-RU")}
    //     </div>
    //   ),
    // }),
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
                  <p className="ml-2">Движение товара</p>
                </div>
              </DropdownItem>

              <DropdownItem
                onItemClick={closeDropdown}
                className="action-button"
                onClick={() => {
                  setBarcodeProduct(row.original);
                  openBarcodeModal();
                }}
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
    const body: ArrivalCreateDTO = {
      productId: arrivalProduct?.id,
      qty: Number(data.qty),
      purchasePrice:
        data.type === "IN" && data.purchasePrice
          ? Number(data.purchasePrice)
          : undefined,
      type: data.type,
      note: data.note,
    };
    createArrival(body, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const handleDownloadPDF = async () => {
    if (!barcodeRef.current || !barcodeProduct) return;

    const svg = barcodeRef.current.querySelector("svg");
    if (!svg) return;

    // ✅ берём реальные размеры из viewBox
    const viewBox = svg.viewBox.baseVal;
    const widthPx = viewBox.width;
    const heightPx = viewBox.height;

    const padding = 20;
    const textHeight = 25;

    const pdfWidth = widthPx + padding * 2;
    const pdfHeight = heightPx + textHeight + padding * 2;

    const pdf = new jsPDF({
      unit: "px",
      format: [pdfWidth, pdfHeight],
      orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
    });

    // ✅ ИЗМЕНЕНО — принудительно устанавливаем размер страницы
    // pdf.internal.pageSize.setWidth(pdfWidth);
    // pdf.internal.pageSize.setHeight(pdfHeight);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    // текст по центру
    pdf.text(barcodeProduct.shortName, pdfWidth / 2, padding, {
      align: "center",
    });

    // вставка SVG (вектор!)
    await svg2pdf(svg, pdf, {
      x: padding,
      y: padding + textHeight,
    });

    // скачивание
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "barcode.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="col-span-12 xl:col-span-7">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Движение товара"
      >
        <ArrivalForm
          closeModal={closeModal}
          control={control}
          arrivalProduct={arrivalProduct}
          handleSubmit={handleSubmit}
          handleArrivalFormSubmit={handleArrivalFormSubmit}
        />
      </Modal>
      <Modal
        isOpen={isBarcodeOpen}
        onClose={closeBarcodeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Штрихкод товара"
      >
        {barcodeProduct?.barcode && (
          <>
            <div className="flex flex-col items-center gap-4">
              <div
                ref={barcodeRef}
                className="bg-white flex flex-col items-center flex-wrap"
              >
                <h3 className="font-semibold mb-2 ">
                  {barcodeProduct.shortName}
                </h3>
                <BarcodePreview value={barcodeProduct.barcode} />
              </div>

              <Button onClick={handleDownloadPDF}>Скачать PDF</Button>
            </div>
          </>
        )}
      </Modal>
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Склад" }]}
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
