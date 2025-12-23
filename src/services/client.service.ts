import { request } from "@/lib/api/request.api";
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  IClient,
} from "@/types/client.interface";

export const ClientService = {
  async getAll() {
    return request<IClient[]>({ url: "/clients", method: "GET" });
  },
  async update(data: ClientUpdateDTO) {
    const { id, ...body } = data;
    return request<IClient>({
      url: `/clients/${id}`,
      method: "PUT",
      data: body,
    });
  },
  async create(data: ClientCreateDTO) {
    return request<IClient>({
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
    return request<IClient>({ url: `/clients/${id}`, method: "GET" });
  },
};
