import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable";
import { ProductShortDTO } from "@/types/product.interface";
import { cn } from "@/lib/utils/cn";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import ColumnFilter from "@/components/shared/ColumnFilter";

type ProductSelectTableProps = {
  products: ProductShortDTO[];
  onSelect: (product: ProductShortDTO) => void;
  closeModal: () => void;
};

export const ProductSelectTable = ({
  products,
  onSelect,
  closeModal,
}: ProductSelectTableProps) => {
  const columns: ColumnDef<ProductShortDTO>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">Наименование</span>
          <ColumnFilter column={column} />
        </div>
      ),
      meta: { className: "w-4/5" },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">Кол-во</span>
          <ColumnFilter column={column} />
        </div>
      ),
      meta: { className: "w-1/5" },
      filterFn: (row, id, value) =>
        String(row.getValue(id)).includes(String(value)),
    },
  ];

  return (
    <div className="overflow-hidden">
      <DataTable
        columns={columns}
        data={products}
        onRowClick={(row) => {
          if (!row.quantity || row.quantity <= 0) return;
          onSelect(row);
        }}
        rowClassName={(row) =>
          !row.quantity || row.quantity <= 0
            ? "opacity-50 cursor-not-allowed"
            : cn("cursor-pointer hover:bg-gray-100")
        }
        pagination
        pageSize={4}
        footerRight={
          <div className="flex items-center justify-end w-full gap-3">
            <Button size="xs" variant="danger" onClick={closeModal}>
              Закрыть
            </Button>
          </div>
        }
      />
    </div>
  );
};
