export interface Client {
  id: number;
  fullName: string;
  phone?: string;
  note?: string;
  type: ClientTypes,
  createdAt: string;
}

export type ClientFormValues = {
  fullName: string
  phone: string
  note: string
}

export type ClientCreateDTO = ClientFormValues;

export type ClientUpdateDTO = ClientFormValues & {
  id: number;
};

export type ClientTypes = "WALK_IN" | "MASTER" | "WHOLESALER"