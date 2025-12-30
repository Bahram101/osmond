import { ArrivalService } from "@/services/arrival.service";
import { IArrival, ArrivalCreateDTO } from "@/types/arrival.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateArrival = () => {
  const queryClient = useQueryClient();
  const { mutate: createArrival, isPending: isCreatingArrival } = useMutation<
    IArrival,
    Error,
    ArrivalCreateDTO
  >({
    mutationKey: ["createArrival"],
    mutationFn: (formData) => ArrivalService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success("Товар успешно оприходаван!");
    },
  });

  return { createArrival, isCreatingArrival };
};

export const useGetArrivals = () => {
  const { data: arrivals = [], isPending: isFetchingArrivals } = useQuery({
    queryKey: ["get-arrivals"],
    queryFn: () => ArrivalService.getAll(),
  });
  
  return { arrivals, isFetchingArrivals };
};
