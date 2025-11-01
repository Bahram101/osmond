import { ProductService } from "@/services/product.service";
import { IProduct, ProductCreateDTO } from "@/types/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      toast.success("Товар успешно создана!");
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
