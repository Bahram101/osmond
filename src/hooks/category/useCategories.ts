import { CategoryService } from "@/services/category.service";
import { ICategory } from "@/types/category.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateCategory = (onSuccess?: () => void) => {
  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation<
    ICategory,
    AxiosError,
    ICategory
  >({
    mutationKey: ["createCategory"],
    mutationFn: (formData) => CategoryService.createCategory(formData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      onSuccess?.();
    },
    onError(error) {
      console.log("error", error);
    },
  });

  return { createCategory, isCreatingCategory };
};

export const useGetCategories = () => {
  const {
    data: categories,
    isPending: isFetchingCategories,
    refetch,
  } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => CategoryService.getAll(),
  });

  return { categories, isFetchingCategories, refetch };
};
