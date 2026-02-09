export interface Client {
  id: number;
  fullName: string;
  phone?: string;
  note?: string;
  type: ClientTypes, 
  createdAt: string;
  hasDebt: boolean
  username?: string | null
}

export type ClientFormValues = {
  fullName: string
  phone: string
  note: string 
  type: ClientTypes

  username?: string
  password?: string
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