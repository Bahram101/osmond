import { DeleteResponse } from "@/hooks/category/useCategories";
import { request } from "@/lib/api/request.api";
import {
  IProduct,
  ProductCreateDTO,
  ProductUpdateDTO,
} from "@/types/product.interface";

export const ProductService = {
  async createProduct(data: ProductCreateDTO) {
    return request<IProduct>({
      url: "/products/create",
      method: "POST",
      data,
    });
  },
  async getAll() {
    return request<IProduct[]>({
      url: "/products",
      method: "GET",
    });
  },
  async getById(id: string) {
    return request<IProduct>({
      url: `/products/${id}`,
      method: "GET",
    });
  },
  async update(id: string, data: ProductUpdateDTO) {
    return request<IProduct>({
      url: `/products/${id}`,
      method: "PUT",
      data,
    });
  },
  async delete(id: string) {
    return request<DeleteResponse>({
      url: `/products/${id}`,
      method: "DELETE",
    });
  },
};
