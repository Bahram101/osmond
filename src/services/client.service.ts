import { request } from "@/lib/api/request.api";
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  Client,
  ClientFilterTypes,
} from "@/types/client.interface";

export const ClientService = {
  async getAll(type: ClientFilterTypes | undefined) {
    return request<Client[]>({
      url: `/clients`,
      method: "GET",
      params: type && type !== "ALL" ? { type } : {},
    });
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
  async getOne(id: number) {
    return request<Client>({ url: `/clients/${id}`, method: "GET" });
  },
  async getSelectList() {
    return request<{ id: number; fullName: string; type: string }[]>({
      url: `/clients/select`,
      method: "GET", 
    });
  },
};
