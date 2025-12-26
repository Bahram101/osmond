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
  items: VisitDetailItem[];
  payments: VisitPayment[];
}

// {
//   "id": 123,
//   "status": "OPEN",
//   "totalAmount": 6200,
//   "items": [
//     {
//       "id": 1,
//       "productId": 4,
//       "quantity": 1,
//       "price": 2500,
//       "total": 2500,
//       "product": { "name": "Батарейка A51" }
//     }
//   ],
//   "payments": []
// }
