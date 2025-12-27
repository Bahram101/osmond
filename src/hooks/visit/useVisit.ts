import { VisitService } from "@/services/visit.service";
import { VisitCreateDTO } from "@/types/visit.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateVisit = () => {
  const queryClient = useQueryClient();
  const { mutate: createVisit, isPending: isCreatingVisit } = useMutation({
    mutationKey: ["create-visit"],
    mutationFn: (data: VisitCreateDTO) => VisitService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getClientVisits"] });
      toast.success("Визит (долг) успешно создан!");
    },
  });
  return { createVisit, isCreatingVisit };
};

export const useGetClientVisits = (clientId: number) => {
  const { data: clientVisits, isPending: isLoadingClientVisits } = useQuery({
    queryKey: ["getClientVisits"],
    queryFn: () => VisitService.getClientVisits(clientId),
    staleTime: 1000 * 60 * 5,
    enabled: !!clientId,
  });
  return { clientVisits, isLoadingClientVisits };
};

export const useGetVisit = (visitId: number) => {
  const { data: visit, isPending: isLoadingVisit } = useQuery({
    queryKey: ["getVisit", visitId],
    queryFn: () => VisitService.getVisit(visitId),
    enabled: !!visitId,
  });

  return { visit, isLoadingVisit };
};
