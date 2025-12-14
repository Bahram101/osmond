import { ClientService } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"

export const useGetClients = () => {
  const { data: clients = [], isPending: isFetchingClients } = useQuery({
    queryKey: ['get-clients'],
    queryFn: () => ClientService.getAll()
  })

  return { clients, isFetchingClients }
}