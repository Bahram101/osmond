import { PaymentService } from "@/services/payment.service";
import { PaymentCreateDTO } from "@/types/payment.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isPending: isCreatingPayment } = useMutation<
    boolean,
    Error,
    { id: number; clientId: number; data: PaymentCreateDTO }
  >({
    mutationKey: ["create-payment"],
    mutationFn: ({ id, data }) => PaymentService.create(id, data),
    onSuccess: (_data, { id, clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["getVisit", id] });
      queryClient.invalidateQueries({ queryKey: ["client-visits", clientId] });
      toast.success("Товар успешно оплачен");
    },
  });

  return { createPayment, isCreatingPayment };
};
