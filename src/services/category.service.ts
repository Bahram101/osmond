import { DeleteResponse } from "@/hooks/category/useCategories";
import { request } from "@/lib/api/request.api";
import {
  ICategory,
  CategoryCreateDTO,
  CategoryUpdateDTO,
  CategoryNode,
} from "@/types/category.interface";
import { ProductInCategoryDTO } from "@/types/product.interface";

export const CategoryService = {
  async createCategory(data: CategoryCreateDTO){
    const res = await request<ICategory>({
      url: "/categories",
      method: "POST",
      data,
    });
    return res;
  },

  async getCategory(id: number): Promise<ICategory> {
    const res = await request<ICategory>({
      url: `/categories/${id}`,
      method: "GET",
    });
    return res;
  },

  async getAll(): Promise<ICategory[]> {
    return await request<ICategory[]>({
      url: "/categories",
      method: "GET",
    });
  },

  async getTree() {
    return await request<CategoryNode[]>({
      url: "/categories/tree",
      method: "GET",
    });
  },

  async deleteCategory(id: number) {
    return await request<DeleteResponse>({
      url: `/categories/${id}`,
      method: "DELETE",
    });
  },

  async updateCategory(
    id: number,
    data: CategoryUpdateDTO
  ) {
    return await request<ICategory>({
      url: `/categories/${id}`,
      method: "PUT",
      data,
    });
  },

  async getCategoryProducts(id: number){
    return await request<ProductInCategoryDTO[]>({
      url: `/categories/${id}/products`,
      method: "GET"
    })
  }
};
