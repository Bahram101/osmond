import { ProductService } from "@/services/product.service";
import { IProduct, IProductCreateDto } from "@/types/product.interface";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const { mutate: createProduct, isPending: isCreatingProduct } = useMutation<
    IProduct,
    Error,
    IProductCreateDto
  >({
    mutationKey: ["createProduct"],
    mutationFn: (formData) => ProductService.createProduct(formData),
    onSuccess: () => {},
  });

  return { createProduct, isCreatingProduct };
};
