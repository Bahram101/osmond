import { request } from "@/lib/api/request.api";
import { ClientVisitItem, VisitCreateDTO } from "@/types/visit.interface";

export const VisitService = {
  async create(data: VisitCreateDTO) {
    return request<{ visitId: number }>({
      url: "/visits",
      method: "POST",
      data,
    });
  },
  
  async getClientVisits(clientId: number){
    return request<ClientVisitItem[]>({
      url: `/clients/${clientId}/visits`,
      method: 'GET'
    })
  }
};
