import { DeleteResponse } from "@/hooks/category/useCategories";
import { request } from "@/lib/api/request.api";
import { ICategory } from "@/types/category.interface";

export const CategoryService = {
  async createCategory(data: ICategory): Promise<ICategory> {
    const res = await request<ICategory>({
      url: "/categories/create",
      method: "POST",
      data,
    });
    return res;
  },

  async getCategory(id: string) {
    const res = await request({
      url: `/categories/${id}`,
      method: "GET",
    })
    return res
  },

  async getAll(): Promise<ICategory[]> {
    return await request<ICategory[]>({
      url: "/categories?type=flat",
      method: "GET",
    });
  },

  async getTree() {
    return await request({
      url: "/categories?type=tree",
      method: "GET",
    });
  },

  async deleteCategory(id: string): Promise<DeleteResponse> {
    return await request<DeleteResponse>({
      url: `/categories/${id}`,
      method: "DELETE"
    })
  },

  async updateCategory(id: string, data: ICategory): Promise<ICategory> {
    return await request({
      url: `/categories/${id}`,
      method: 'PUT',
      data
    })
  }
};
