import { request } from "@/lib/api/request.api";
import { VisitCreateDTO } from "@/types/visit.interface";

export const VisitService = {
  async create(data: VisitCreateDTO) {
    return request<{ visitId: number }>({
      url: "/visits",
      method: "POST",
      data,
    });
  },
};
