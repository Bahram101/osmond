import { ProductService } from "@/services/product.service";
import {
  IProduct,
  ProductCreateDTO,
  ProductUpdateDTO,
} from "@/types/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreatingProduct } = useMutation<
    IProduct,
    Error,
    ProductCreateDTO
  >({
    mutationKey: ["createProduct"],
    mutationFn: (formData) => ProductService.createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success("Товар успешно создан!");
    },
  });
  return { createProduct, isCreatingProduct };
};

export const useGetProducts = () => {
  const { data: products = [], isPending: isFetchingProducts } = useQuery<
    IProduct[]
  >({
    queryKey: ["get-products"],
    queryFn: () => ProductService.getAll(),
  });
  return { products, isFetchingProducts };
};

export const useGetProduct = (id?: string) => {
  const { data: product, isPending: isFetchingProduct } = useQuery<IProduct>({
    queryKey: ["get-product", id],
    queryFn: () => ProductService.getById(id as string),
    enabled: !!id,
  });
  return { product, isFetchingProduct };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateProduct, isPending: isUpdatingProduct } = useMutation<
    IProduct,
    Error,
    { id: string; data: ProductUpdateDTO }
  >({
    mutationKey: ["updateProduct"],
    mutationFn: ({ id, data }) => ProductService.update(id, data),
    onSuccess: (updatedProduct, { id }) => {
      queryClient.setQueryData(["get-product", id], updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success("Товар успешно обновлено");
      router.push("/admin/products");
    },
  });
  return { updateProduct, isUpdatingProduct };
};
