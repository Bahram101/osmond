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
  productId: number;
  price: number;
  quantity: number;
}

export type VisitStatus = "OPEN" | "PARTIAL" | "PAID";
export interface ClientVisitItem {
  id: number;
  date: string;
  totalAmount: number;
  paidAmount: number;
  debtAmount: number;
  status: VisitStatus;
}
