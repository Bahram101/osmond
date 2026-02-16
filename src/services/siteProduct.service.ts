import { request } from "@/lib/api/request.api";
import { SiteProductDTO } from "@/types/site/product.interface";

export const SiteProductService = {
  async getAll() {
    return request<SiteProductDTO[]>({
      url: "/site/products",
      method: "GET",
    });
  },
};
