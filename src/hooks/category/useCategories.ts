import { CategoryService } from "@/services/category.service";
import { ICategory, ICategoryCreateDto, ICategoryUpdateDto } from "@/types/category.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface DeleteResponse {
  message: string;
}

export const useCreateCategory = (onSuccess?: () => void) => {
  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation<
    ICategory,
    AxiosError,
    ICategoryCreateDto
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

export const useGetCategoryById = (id: string) => {
  const { data: category, isPending: isFetchingCategory, refetch: refetchCategory } = useQuery<ICategory>({
    queryKey: ['get-category', id],
    queryFn: () => CategoryService.getCategory(id)
  })
  return { category, isFetchingCategory, refetchCategory }
}

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
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: updateCategory, isPending: isUpdatingCategory } = useMutation<ICategory, AxiosError, { id: string, data: ICategoryUpdateDto }>({
    mutationKey: ['updateCategory'],
    mutationFn: ({ id, data }) => CategoryService.updateCategory(id, data),
    onSuccess: (updatedCategory, { id }) => {
      queryClient.setQueryData(['get-category', id], updatedCategory)
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
      toast.success('Категория успешно обновлена')
      router.push('/admin/categories')
    },
    onError(error) {
      console.log('eee', error)
    }
  })
  return { updateCategory, isUpdatingCategory }
}
