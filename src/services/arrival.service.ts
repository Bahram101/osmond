import { request } from "@/lib/api/request.api";
import { IArrival, ArrivalCreateDTO } from "@/types/arrival.interface";

export const ArrivalService = {
  async create(data: ArrivalCreateDTO) {
    return request<IArrival>({ url: "/arrivals", method: "POST", data });
  },
  async getAll() {
    return request<IArrival[]>({ url: "/arrivals", method: "GET" });
  },
};
