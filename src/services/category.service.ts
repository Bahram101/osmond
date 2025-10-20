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
    const res = await request<ICategory[]>({
      url: "/categories",
      method: "GET",
    });
    console.log('res',res)
    return res;
  },
};
