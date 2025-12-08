import { request } from "@/lib/api/request.api";
import { ISale } from "@/types/sale.interface";

export const SaleService = {
  getAll() {
    return request<ISale[]>({ url: "/sales", method: "GET" });
  },
};
