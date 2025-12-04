import { ArrivalService } from "@/services/arrival.service";
import {
  IArrival,
  IArrivalRequest,
} from "@/types/arrival.interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useArrival = () => {
  const { mutate: createArrival, isPending: isCreatingArrival } = useMutation<
    IArrival,
    Error,
    IArrivalRequest
  >({
    mutationKey: ["createArrival"],
    mutationFn: (formData) => ArrivalService.create(formData),
    onSuccess: () => {
      toast.success("Товар успешно оприходаван!");
    },
  });

  return { createArrival, isCreatingArrival };
};
