import { VisitService } from "@/services/visit.service";
import { VisitCreateDTO, VisitItemRefundDTO } from "@/types/visit.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateVisit = () => {
  const queryClient = useQueryClient();
  const { mutate: createVisit, isPending: isCreatingVisit } = useMutation({
    mutationKey: ["create-visit"],
    mutationFn: (data: VisitCreateDTO) => VisitService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-visits"] });
      queryClient.invalidateQueries({ queryKey: ["all-visits"] });
      toast.success("Визит (долг) успешно создан!");
    },
  });
  return { createVisit, isCreatingVisit };
};

export const useGetClientVisits = (clientId: number) => {
  const { data: clientVisits, isPending: isLoadingClientVisits } = useQuery({
    queryKey: ["client-visits", clientId],
    queryFn: () => VisitService.getClientVisits(clientId),
    staleTime: 1000 * 60 * 5,
    enabled: !!clientId,
  });
  return { clientVisits, isLoadingClientVisits };
};

export const useGetAllVisits = () => {
  const { data: allVisits, isPending: isLoadingAllVisits } = useQuery({
    queryKey: ["all-visits"],
    queryFn: () => VisitService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
  return { allVisits, isLoadingAllVisits };
};

export const useGetVisit = (visitId: number) => {
  const { data: visit, isPending: isLoadingVisit } = useQuery({
    queryKey: ["getVisit", visitId],
    queryFn: () => VisitService.getVisit(visitId),
    enabled: !!visitId,
  });

  return { visit, isLoadingVisit };
};

export const useRefundVisitItem = () => {
  const queryClient = useQueryClient();

  const { mutate: refundVisitItem, isPending: isRefundingVisitItem } =
    useMutation({
      mutationKey: ["refund-visit-item"],
      mutationFn: ({
        visitId,
        data,
      }: {
        visitId: number;
        data: VisitItemRefundDTO;
      }) => VisitService.refundVisitItem(visitId, data),

      onSuccess: (_data, data) => {
        queryClient.invalidateQueries({
          queryKey: ["client-visits", data.visitId],
        });
        queryClient.invalidateQueries({ queryKey: ["getVisit", data.visitId] });

        toast.success("Возврат успешно выполнен!");
      },
    });

  return { refundVisitItem, isRefundingVisitItem };
};
