import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable";
import { ProductShortDTO } from "@/types/product.interface";
import { cn } from "@/lib/utils/cn";

type ProductSelectTableProps = {
  products: ProductShortDTO[];
  onSelect: (product: ProductShortDTO) => void;
};

export const ProductSelectTable = ({
  products,
  onSelect,
}: ProductSelectTableProps) => {
  const columns: ColumnDef<ProductShortDTO>[] = [
    {
      accessorKey: "name",
      header: "Товар",
    },
    {
      accessorKey: "quantity",
      header: "Кол-во",
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
      />
    </div>
  );
};
