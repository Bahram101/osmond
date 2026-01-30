import { request } from "@/lib/api/request.api";
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  Client,
} from "@/types/client.interface";

export const ClientService = {
  async getAll() {
    return request<Client[]>({ url: "/clients", method: "GET" });
  },
  async update(data: ClientUpdateDTO) {
    const { id, ...body } = data;
    return request<Client>({
      url: `/clients/${id}`,
      method: "PUT",
      data: body,
    });
  },
  async create(data: ClientCreateDTO) {
    return request<Client>({
      url: `/clients`,
      method: "POST",
      data,
    });
  },
  async delete(id: number) {
    return request({
      url: `/clients/${id}`,
      method: "DELETE",
    });
  },
  async getOne(id: number)  {
    return request<Client>({ url: `/clients/${id}`, method: "GET" });
  },
};
