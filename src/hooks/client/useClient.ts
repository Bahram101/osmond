import { ClientService } from "@/services/client.service";
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  IClient,
} from "@/types/client.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetClients = () => {
  const { data: clients = [], isPending: isFetchingClients } = useQuery({
    queryKey: ["get-clients"],
    queryFn: () => ClientService.getAll(),
  });

  return { clients, isFetchingClients };
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const { mutate: updateClient, isPending: isUpdatingClient } = useMutation<
    IClient,
    Error,
    ClientUpdateDTO
  >({
    mutationKey: ["update-client"],
    mutationFn: (data: ClientUpdateDTO) => ClientService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-clients"] });
      toast.success("Клиент успешно обновлен!");
    },
  });
  return { updateClient, isUpdatingClient };
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const { mutate: createClient, isPending: isCreatingClient } = useMutation({
    mutationKey: ["create-client"],
    mutationFn: (data: ClientCreateDTO) => ClientService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-clients"] });
      toast.success("Клиент успешно создан!");
    },
  });
  return { createClient, isCreatingClient };
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteClient, isPending: isDeletingClient } = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: (id: number) => ClientService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-clients"] });
    },
  });
  return { deleteClient, isDeletingClient };
};

export const useGetClient = (id: number) => {
  const { data: client, isPending: isFetchingClient } = useQuery<IClient>({
    queryKey: ["get-client", id],
    queryFn: () => ClientService.getOne(id),
    enabled: !!id,
  });
  return { client, isFetchingClient };
};
