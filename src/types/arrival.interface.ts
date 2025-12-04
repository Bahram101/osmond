export interface IArrival {
  id: number;
  productId: string;
  qty: number;
  note?: string;
  createdAt: string;
}

export interface IArrivalForm {
  qty: number;
  note?: string;
}

export interface IArrivalRequest extends IArrivalForm {
  productId: string;
}
