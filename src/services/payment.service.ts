import { request } from "@/lib/api/request.api";
import { PaymentCreateDTO, PaymentFormValues } from "@/types/payment.interface";

export const PaymentService = {
  async create(id: number, data: PaymentCreateDTO) {
    return request<boolean>({
      url: `visits/${id}/payments`,
      method: "POST",
      data,
    });
  },

  async createAll(id: number, data: PaymentFormValues) {
    return request<boolean>({
      url: `/clients/${id}/pay-debt`,
      method: "POST",
      data,
    });
  },
};
