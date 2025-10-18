import { request } from "@/lib/api/request.api";
import { ICategory } from "@/types/category.interface";

export const CategoryService = {
  async createCategory(data: ICategory) {
    try {
      const res = await request<ICategory>({
        url: '/category/create',
        method: 'POST',
        data
      })
      return res
    } catch (e) {
      throw e
    }
  },

}