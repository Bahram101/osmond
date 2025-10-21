import { request } from "@/lib/api/request.api";
import { ICategory } from "@/types/category.interface";

export const CategoryService = {
  async createCategory(data: ICategory) {
    const res = await request<ICategory>({
      url: "/categories/create",
      method: "POST",
      data,
    });
    return res;
  },

  async getAll() {
    return await request({
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
};
