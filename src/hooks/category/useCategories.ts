import { CategoryService } from "@/services/category.service";
import {
  ICategory,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "@/types/category.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface DeleteResponse {
  message: number;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation<
    ICategory,
    AxiosError,
    CategoryCreateDTO
  >({
    mutationKey: ["createCategory"],
    mutationFn: (formData) => CategoryService.createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      toast.success("Категория успешно создана");
    },
    onError(error) {
      console.log("error", error);
    },
  });
  return { createCategory, isCreatingCategory };
};

export const useGetCategoryById = (id?: number) => {
  const { data: category, isPending: isFetchingCategory } = useQuery<ICategory>(
    {
      queryKey: ["get-category", id],
      queryFn: () => CategoryService.getCategory(id as number),
      enabled: !!id,
    }
  );
  return { category, isFetchingCategory };
};

export const useGetCategories = () => {
  const { data: categories = [], isPending: isFetchingCategories } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => CategoryService.getAll(),
  });
  return { categories, isFetchingCategories };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation<
    DeleteResponse,
    AxiosError,
    number
  >({
    mutationKey: ["delete-category"],
    mutationFn: (id) => CategoryService.deleteCategory(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCategory, isDeleting };
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateCategory, isPending: isUpdatingCategory } = useMutation<
    ICategory,
    AxiosError,
    { id: number; data: CategoryUpdateDTO }
  >({
    mutationKey: ["updateCategory"],
    mutationFn: ({ id, data }) => CategoryService.updateCategory(id, data),
    onSuccess: (updatedCategory, { id }) => {
      queryClient.setQueryData(["get-category", id], updatedCategory);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      toast.success("Категория успешно обновлена");
      router.push("/admin/categories");
    },
    onError(error) {
      console.log("eee", error);
    },
  });
  return { updateCategory, isUpdatingCategory };
};
