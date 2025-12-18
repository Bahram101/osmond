"use client";
import {
  useCreateClient,
  useDeleteClient,
  useGetClients,
  useUpdateClient,
} from "@/hooks/client/useClient";
import { IClient, IClientForm } from "@/types/client.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "../../components/common/BreadCrumb";
import { DataTable } from "@/components/common/DataTable";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import ClientForm from "./components/ClientForm";
import { useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";

const ClientPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { control, handleSubmit, reset } = useForm<IClientForm>();
  const { clients, isFetchingClients } = useGetClients();
  const { updateClient, isUpdatingClient } = useUpdateClient();
  const { createClient, isCreatingClient } = useCreateClient();
  const { deleteClient, isDeletingClient } = useDeleteClient();
  const [currentClient, setCurrentClient] = useState<IClient | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Точно удалить категорию?")) {
      setDeletingId(id);
      deleteClient(id);
    }
  };

  const handleOpenModal = (client: IClient | null) => {
    setCurrentClient(client);
    if (client) {
      reset({
        fullName: client.fullName,
        phone: client.phone,
        note: client.note,
      });
    } else {
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

  const handleClientFormSubmit = (data: IClientForm) => {
    if (currentClient) {
      updateClient(
        {
          id: currentClient.id,
          ...data,
        },
        {
          onSuccess: onSuccessHandler,
        }
      );
    } else {
      createClient(data, {
        onSuccess: onSuccessHandler,
      });
    }
  };

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
    columnHelper.display({
      id: "actions",
      header: "",
      size: 260,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-3">
            <Button
              variant="danger"
              size="tiny"
              onClick={() => handleDelete(row.original.id!)}
            >
              {isDeletingClient && deletingId === row.original.id ? (
                <Loader />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>

            <Button
              variant="primary"
              size="tiny"
              onClick={() => handleOpenModal(row.original)}
            >
              <Pencil className="size-4" />
            </Button>
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
        className="max-w-[584px] p-4 lg:p-6"
        title="Создать новый клиент"
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

          <Button
            size="xs"
            variant="primary"
            startIcon={<Plus />}
            onClick={() => handleOpenModal(null)}
          >
            Создать
          </Button>
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
