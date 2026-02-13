export interface IArrival {
  id: number;
  productId: number;
  qty: number;
  note?: string;
  createdAt: string;
  product:{
    id: number,
    name: string
  },
  type: Type
}

export type Type = "IN" | "OUT"
export interface IArrivalForm {
  qty: number;
  purchasePrice?: number;
  type: Type;
  note?: string;
}

export interface ArrivalCreateDTO extends IArrivalForm {
  productId: number;
}
