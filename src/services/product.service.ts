import { request } from "@/lib/api/request.api";
import { IProduct, IProductCreateDto } from "@/types/product.interface";

export const ProductService = {
  async createProduct(data: IProductCreateDto) {
    return request<IProduct>({
      url: "/products/create",
      method: "POST",
      data,
    });
  },
};
