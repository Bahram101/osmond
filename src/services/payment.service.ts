import { request } from "@/lib/api/request.api";
import { PaymentCreateDTO } from "@/types/payment.interface";

export const PaymentService = {
  async create(id: number, data: PaymentCreateDTO) {
    return request<boolean>({
      url: `visits/${id}/payments`,
      method: "POST",
      data,
    });
  },
};
