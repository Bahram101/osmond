export interface VisitItemForm {
  productId: number;
  name: string;
  price: number;
  retailPrice: number;
  masterPrice: number;
  wholesalePrice: number;
  quantity: number;
  servicePrice?: number | null;
  // total: number;
}

export interface VisitItemCreateDTO {
  productId: number;
  price: number;
  quantity: number;
}

export type VisitStatus = "OPEN" | "PARTIAL" | "PAID";
export interface ClientVisitItem {
  id: number;
  clientName: string;
  totalAmount: number;
  paidAmount: number;
  debtAmount: number;
  status: VisitStatus;
  date: string;
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
  servicePrice?: number | null;
}

export interface VisitPayment {
  id: number;
  visitId: number;
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
  client: { fullName: string };
}

export interface VisitCreateDTO {
  clientId?: number | null;
  items: VisitItemCreateDTO[];
  payNow: boolean;
  walkInClient: WalkInClient | null;
}

type WalkInClient = {
  fullName: string;
  phone: string;
  note: string;
};

export type VisitFormValues = {
  clientId: number | null;
  clientType: "MASTER" | "WALK_IN" | "WHOLESALER" | null;
  paymentType: "debt" | "pay_now" | null;
  fullName?: string;
  phone?: string;
  note?: string;
};

export interface VisitItemRefundDTO {
  visitItemId: number;
  quantityToReturn: number;
}
