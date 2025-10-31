import { request } from "@/lib/api/request.api";
import { IProduct, ProductCreateDTO } from "@/types/product.interface";

export const ProductService = {
  async createProduct(data: ProductCreateDTO) {
    return request<IProduct>({
      url: "/products/create",
      method: "POST",
      data,
    });
  },
  async getProducts() {
    return request<IProduct>({
      url: "/products",
      method: "GET",
    });
  },
};
