"use client";
import {
  useCreateClient,
  useDeleteClient,
  useGetClients,
  useUpdateClient,
} from "@/hooks/client/useClient";
import { Client, ClientFilterValues, ClientFilterTypes, ClientFormValues } from "@/types/client.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import BreadCrumb from "../../components/common/BreadCrumb";
import { DataTable } from "@/components/common/DataTable";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import ClientForm from "./components/ClientForm";
import { useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { CLIENT_TYPE_LABEL } from "@/lib/constants";
import { Selector } from "@/components/shared/select/Selector";

const ClientPage = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { updateClient, isUpdatingClient } = useUpdateClient();
  const { createClient, isCreatingClient } = useCreateClient();
  const { deleteClient, isDeletingClient } = useDeleteClient();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const { control, handleSubmit, reset } = useForm<ClientFormValues>({
    defaultValues: {
      type: "MASTER"
    }
  });
  const { control: filterControl, watch } = useForm<ClientFilterValues>({
    mode: 'all',
    defaultValues: {
      type: "ALL"
    }
  });
  const type = watch('type')
  const { clients, isFetchingClients } = useGetClients(type);

  const handleDelete = async (id: number) => {
    if (confirm("Точно удалить клиента?")) {
      setDeletingId(id);
      deleteClient(id);
    }
  };

  const handleOpenModal = (client: Client | null) => {
    setCurrentClient(client);
    if (client) {
      setClientId(client.id);
      reset({
        fullName: client.fullName,
        phone: client.phone,
        note: client.note,
      });
    } else {
      setClientId(null);
      reset({
        fullName: "",
        phone: "",
        note: "",
      });
    }
    openModal();
  };

  const onSuccessHandler = () => {
    reset();
    closeModal();
  };

  const handleClientFormSubmit = (data: ClientFormValues) => {
    if (currentClient) {
      updateClient(
        {
          id: currentClient.id,
          ...data,
        },
        {
          onSuccess: onSuccessHandler,
        },
      );
    } else {
      createClient(data, {
        onSuccess: onSuccessHandler,
      });
    }
  };

  const columnHelper = createColumnHelper<Client>();

  const columns: ColumnDef<Client, any>[] = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      header: "Имя",
    }),
    columnHelper.accessor("phone", {
      header: "Телефон",
    }),
    columnHelper.accessor("note", {
      header: "Заметки",
    }),
    columnHelper.accessor("type", {
      header: "Тип",
      cell: ({ row }) => <div className="flex justify-center">{CLIENT_TYPE_LABEL[row.original.type]}</div>,
    }),
    columnHelper.accessor("createdAt", {
      header: "Дата создания",
      cell: ({ getValue }) => (
        <div className="text-center">
          {new Date(getValue()).toLocaleDateString("ru-RU")}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      size: 260,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              size="tiny"
              onClick={() => router.push(`/admin/clients/${row.original.id}`)}
            >
              Просмотр
            </Button>

            <Button
              variant="warning"
              size="tiny"
              onClick={() => {
                setClientId(row.original.id);
                handleOpenModal(row.original);
              }}
            >
              Изменить
            </Button>

            {/* <Button
              variant="danger"
              size="tiny"
              onClick={() => handleDelete(row.original.id!)}
            >
              {isDeletingClient && deletingId === row.original.id ? (
                <Loader />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button> */}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title={clientId ? "Изменить клиента" : "Создать новый клиент"}
      >
        <ClientForm
          closeModal={closeModal}
          control={control}
          handleSubmit={handleSubmit}
          handleClientFormSubmit={handleClientFormSubmit}
        />
      </Modal>
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Клиенты" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список клиентов</h3>
          <div className="flex items-center gap-3">
            <div className="w-2/3">
              <Selector<ClientFilterValues, ClientFilterTypes>
                name="type"
                control={filterControl}
                options={[
                  { label: "Все", value: "ALL" },
                  { label: "Клиенты", value: "WALK_IN" },
                  { label: "Мастеры", value: "MASTER" },
                  { label: "Оптовики", value: "WHOLESALER" },
                ]}
              />
            </div>
            <Button
              className="whitespace-nowrap"
              size="xs"
              variant="success"
              startIcon={<Plus size="18" />}
              onClick={() => handleOpenModal(null)}
            >
              Добавление нового клиента
            </Button>
          </div>
        </div>

        {isFetchingClients ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={clients} />
        )}
      </div>
    </div>
  );
};

export default ClientPage;
