import { CategoryService } from "@/services/category.service";
import { ICategory } from "@/types/category.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface DeleteResponse {
  message: string;
}

export const useCreateCategory = (onSuccess?: () => void) => {
  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation<
    ICategory,
    AxiosError,
    ICategory
  >({
    mutationKey: ["createCategory"],
    mutationFn: (formData) => CategoryService.createCategory(formData),
    onSuccess: () => {
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
    data: categories = [],
    isPending: isFetchingCategories,
    refetch,
  } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => CategoryService.getAll(),
  });

  return { categories, isFetchingCategories, refetch };
};

export const useDeleteCategory = (onSuccess?: () => void) => {
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation<
    DeleteResponse,
    AxiosError,
    string
  >({
    mutationKey: ["delete-category"],
    mutationFn: (id) => CategoryService.deleteCategory(id),
    onSuccess: (data) => {
      onSuccess?.();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCategory, isDeleting };
};

export const useUpdateCategory = (onSuccess?: () => void) => {
  const { mutate: useUpdateCategory, isPending: isUpdatingCategory } = useMutation<ICategory, AxiosError, { id: string, data: ICategory }>({
    mutationKey: ['updateCategory'],
    mutationFn: ({ id, data }) => CategoryService.updateCategory(id, data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError(error) {
      console.log('eee', error)
    }
  })

  return { useUpdateCategory, isUpdatingCategory }
}
