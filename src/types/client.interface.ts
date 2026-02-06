export interface Client {
  id: number;
  fullName: string;
  phone?: string;
  note?: string;
  type: ClientTypes,
  visits:{
    status: string
  }[]
  createdAt: string;
}

export type ClientFormValues = {
  fullName: string
  username: string
  password: string
  phone: string
  note: string
  type: Exclude<ClientTypes, "WALK_IN">
}

export type ClientCreateDTO = ClientFormValues;

export type ClientUpdateDTO = ClientFormValues & {
  id: number;
};

export type ClientTypes = "WALK_IN" | "MASTER" | "WHOLESALER"

export type ClientFilterTypes = ClientTypes | "ALL"

export type ClientFilterValues = {
  type: ClientFilterTypes
}