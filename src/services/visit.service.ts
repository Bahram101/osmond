import { request } from "@/lib/api/request.api";
import {
  ClientVisitItem,
  VisitCreateDTO,
  VisitDetail,
} from "@/types/visit.interface";

export const VisitService = {
  async create(data: VisitCreateDTO) {
    return request<{ visitId: number }>({
      url: "/visits",
      method: "POST",
      data,
    });
  },

  async getClientVisits(clientId: number) {
    return request<ClientVisitItem[]>({
      url: `/clients/${clientId}/visits`,
      method: "GET",
    });
  },

  async getVisit(visitId: number) {
    return request<VisitDetail>({ url: `/visits/${visitId}`, method: "GET" });
  },
};
