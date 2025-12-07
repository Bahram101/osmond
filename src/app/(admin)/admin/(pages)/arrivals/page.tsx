'use client'
import { useGetArrivals } from '@/hooks/arrival/useArrival'
import { IArrival } from '@/types/arrival.interface'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Button from '../../components/ui/button/Button'
import { Link, Pencil, Plus, Trash2 } from 'lucide-react'
import BreadCrumb from '../../components/common/BreadCrumb'
import Loader from '@/components/shared/Loader'
import { DataTable } from '@/components/common/DataTable'

const ArrivalsPage = () => {

  const { arrivals, isFetchingArrivals } = useGetArrivals()
  console.log('arrivals', arrivals)
  const columnHelper = createColumnHelper<IArrival>();

  const columns: ColumnDef<IArrival, any>[] = [
    columnHelper.accessor((row) => row.product?.name ?? "-", {
      id: "product.name",
      header: "Название товара",
    }),
    columnHelper.accessor("qty", {
      header: "Количество",
      cell: (row) => {
        return <div className='text-center'>
          {row.getValue()}
        </div>
      }
    }),
    columnHelper.accessor("note", {
      header: "Заметки",
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата создания",
      cell: ({ getValue }) => {
        return (
          <div className='text-center'>
            {new Date(getValue()).toLocaleDateString("ru-RU")}
          </div>
        )
      }
    }),
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Оприходование" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список оприходованных товаров</h3>
        </div>

        {isFetchingArrivals ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={arrivals} />
        )}
      </div>
    </div>
  );
}

export default ArrivalsPage