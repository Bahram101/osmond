import { ProductService } from "@/services/product.service";
import {
  ProductResponse,
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductShortDTO,
} from "@/types/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteResponse } from "../category/useCategories";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreatingProduct } = useMutation<
    ProductResponse,
    Error,
    ProductCreateDTO
  >({
    mutationKey: ["createProduct"],
    mutationFn: (formData) => ProductService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success("Товар успешно создан!");
    },
  });
  return { createProduct, isCreatingProduct };
};

export const useGetProducts = () => {
  const { data: products = [], isPending: isFetchingProducts } = useQuery<
    ProductResponse[]
  >({
    queryKey: ["get-products"],
    queryFn: () => ProductService.getAll(),
  });
  return { products, isFetchingProducts };
};

export const useGetProduct = (id?: number) => {
  const { data: product, isPending: isFetchingProduct } = useQuery<ProductResponse>({
    queryKey: ["get-product", id],
    queryFn: () => ProductService.getById(id as number),
    enabled: !!id,
  });
  return { product, isFetchingProduct };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateProduct, isPending: isUpdatingProduct } = useMutation<
    ProductResponse,
    Error,
    { id: number; data: ProductUpdateDTO }
  >({
    mutationKey: ["updateProduct"],
    mutationFn: ({ id, data }) => ProductService.update(id, data),
    onSuccess: (updatedProduct, { id }) => {
      // queryClient.setQueryData(["get-product", id], updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success("Товар успешно обновлено");
      router.push("/admin/products");
    },
  });
  return { updateProduct, isUpdatingProduct };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeletingProduct } = useMutation<
    DeleteResponse,
    Error,
    number
  >({
    mutationKey: ["delete-product"],
    mutationFn: (id) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
    onError(e) {
      console.log(e);
    },
  });
  return { deleteProduct, isDeletingProduct };
};

// export const useGetProductByBarcode = (barcode: string) => {
//   const { data: productByBarcode, isPending: isFetchingProdByBarcode } = useQuery({
//     queryKey: ['get-product-by-barcode'],
//     queryFn: () => ProductService.getProductByBarcode(barcode),
//     enabled: !!barcode
//   })
//   return { productByBarcode, isFetchingProdByBarcode }
// }


export const useGetProductByBarcode = () => {
  const {
    mutateAsync: getProductByBarcode,
    isPending: isFetchingProdByBarcode,
  } = useMutation<ProductShortDTO, Error, string>({
    mutationKey: ["get-product-by-barcode"],
    mutationFn: (barcode: string) =>
      ProductService.getProductByBarcode(barcode),
  });

  return {
    getProductByBarcode,
    isFetchingProdByBarcode,
  };
};