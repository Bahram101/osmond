import { request } from "@/lib/api/request.api";
import { IClient } from "@/types/client.interface";

export const ClientService = {
  async getAll() {
    return request<IClient[]>({ url: "/clients", method: "GET" });
  },
  async update(data: IClient) {
    return request<IClient>({
      url: `/clients/${data.id}`,
      method: "PUT",
      data,
    });
  },
};
