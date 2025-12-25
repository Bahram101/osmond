import { VisitService } from "@/services/visit.service";
import { VisitCreateDTO } from "@/types/visit.interface";
import { useMutation } from "@tanstack/react-query";
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
