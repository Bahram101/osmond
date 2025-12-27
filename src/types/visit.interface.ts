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

export interface VisitDetailItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  total: number;
  product: {
    name: string;
  };
}

export interface VisitPayment {
  id: number;
  amount: number;
  note?: string | null;
  createdAt: string;
}

export interface VisitDetail {
  id: number;
  totalAmount: number;
  status: VisitStatus;
  createdAt: string;
  paidAmount: number;
  debtAmount: number;
  items: VisitDetailItem[];
  payments: VisitPayment[];
}
