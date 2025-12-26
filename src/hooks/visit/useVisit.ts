import { VisitService } from "@/services/visit.service";
import { VisitCreateDTO } from "@/types/visit.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateVisit = () => {
  const { mutate: createVisit, isPending: isCreatingVisit } = useMutation({
    mutationKey: ["create-visit"],
    mutationFn: (data: VisitCreateDTO) => VisitService.create(data),
    onSuccess: () => {
      toast.success("Визит (долг) успешно создан!");
    },
  });
  return { createVisit, isCreatingVisit };
};

export const useGetClientVisits = (clientId: number) => {
  const { data: clientVisits, isPending: isLoadingClientVisits } = useQuery({
    queryKey: ["getClientVisits"],
    queryFn: () => VisitService.getClientVisits(clientId),
    enabled: !!clientId,
  });
  return { clientVisits, isLoadingClientVisits };
};
