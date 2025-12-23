import { request } from "@/lib/api/request.api";
import { IArrival, IArrivalRequest } from "@/types/arrival.interface";

export const ArrivalService = {
  async create(data: IArrivalRequest) {
    return request<IArrival>({ url: "/arrivals", method: "POST", data });
  },
  async getAll() {
    return request<IArrival[]>({ url: "/arrivals", method: "GET" });
  },
};
