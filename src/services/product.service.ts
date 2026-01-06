import { DeleteResponse } from "@/hooks/category/useCategories";
import { request } from "@/lib/api/request.api";
import {
  ProductResponse,
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductShortDTO,
} from "@/types/product.interface";

export const ProductService = {
  async create(data: ProductCreateDTO) {
    return request<ProductResponse>({
      url: "/products",
      method: "POST",
      data,
    });
  },
  async getAll() {
    return request<ProductResponse[]>({
      url: "/products",
      method: "GET",
    });
  },
  async getById(id: number) {
    return request<ProductResponse>({
      url: `/products/${id}`,
      method: "GET",
    });
  },
  async update(id: number, data: ProductUpdateDTO) {
    return request<ProductResponse>({
      url: `/products/${id}`,
      method: "PUT",
      data,
    });
  },
  async delete(id: number) {
    return request<DeleteResponse>({
      url: `/products/${id}`,
      method: "DELETE",
    });
  },
  async getProductByBarcode(barcode: string) {
    return request<ProductShortDTO>({
      url: `/products/barcode/${barcode}`,
      method: 'GET',
      showToast: false
    })
  }
};
