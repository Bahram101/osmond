export interface VisitItemForm {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface VisitCreateDTO {
  clientId: number;
  items: VisitItemCreateDTO[];
}

export interface VisitItemCreateDTO {
  items: {
    productId: number;
    price: number;
    quantity: number;
  };
}
