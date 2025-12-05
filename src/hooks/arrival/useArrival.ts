import { ArrivalService } from "@/services/arrival.service";
import {
  IArrival,
  IArrivalRequest,
} from "@/types/arrival.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useArrival = () => {
  const queryClient = useQueryClient()
  const { mutate: createArrival, isPending: isCreatingArrival } = useMutation<
    IArrival,
    Error,
    IArrivalRequest
  >({
    mutationKey: ["createArrival"],
    mutationFn: (formData) => ArrivalService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['get-products']})
      toast.success("Товар успешно оприходаван!");
    },
  });

  return { createArrival, isCreatingArrival };
};
