'use client'
import { useGetClients } from '@/hooks/client/useClient'
import { IClient } from '@/types/client.service';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EllipsisVertical, Loader, Pencil, ScanBarcode, Trash2, Van } from 'lucide-react';
import { Dropdown } from '../../components/ui/dropdown/Dropdown';
import { DropdownItem } from '../../components/ui/dropdown/DropdownItem';
import BreadCrumb from '../../components/common/BreadCrumb';
import { DataTable } from '@/components/common/DataTable';

const ClientPage = () => {
  const { clients, isFetchingClients } = useGetClients()

  const columnHelper = createColumnHelper<IClient>();


  const columns: ColumnDef<IClient, any>[] = [
    columnHelper.accessor("fullName", {
      header: "Имя",
    }),
    columnHelper.accessor("phone", {
      header: "Телефон",
    }),
    columnHelper.accessor("note", {
      header: "Заметки",
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата создания",
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("ru-RU"),
    }),
     
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Клиенты" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список клиентов</h3>
        </div>

        {isFetchingClients ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={clients} />
        )}
      </div>
    </div>
  );
}

export default ClientPage