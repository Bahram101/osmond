import { PaymentService } from "@/services/payment.service";
import { PaymentCreateDTO, PaymentFormValues } from "@/types/payment.interface";
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

export const useCreatePaymentAll = () => {
  const queryClient = useQueryClient();
  const { mutate: createPaymentAll, isPending: isCreatingPaymentAll } =
    useMutation<boolean, Error, { clientId: number; data: PaymentFormValues }>({
      mutationKey: ["create-payment-all"],
      mutationFn: ({ clientId, data }) =>
        PaymentService.createAll(clientId, data),
      onSuccess: (_data, { clientId }) => {
        queryClient.invalidateQueries({ queryKey: ["getVisit", clientId] });
        queryClient.invalidateQueries({
          queryKey: ["client-visits", clientId],
        });
        toast.success("Оплата долга распределена");
      },
    });
  return { createPaymentAll, isCreatingPaymentAll };
};
