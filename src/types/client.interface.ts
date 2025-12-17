export interface IClient {
  id: number;
  fullName: string;
  phone?: string;
  note?: string;
  createdAt: string;
}
export type IClientForm = Pick<IClient, "fullName" | "phone" | "note">;

export type ClientUpdateDTO = IClientForm & {
  id: number;
};
