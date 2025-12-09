export interface IArrival {
  id: number;
  productId: number;
  qty: number;
  note?: string;
  createdAt: string;
  product:{
    id: number,
    name: string
  }
}

export interface IArrivalForm {
  qty: number;
  note?: string;
}

export interface IArrivalRequest extends IArrivalForm {
  productId: number;
}
