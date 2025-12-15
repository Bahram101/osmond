export interface IClient {
  id: number;
  fullName: string;
  phone?: string;
  note?: string;
  createdAt: string;
}

export interface IClientForm {
  fullName: string;
  phone?: string;
  note?: string;
}
