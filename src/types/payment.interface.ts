export interface PaymentFormValues {
  amount: number;
  note?: string;
}

export interface PaymentCreateDTO extends PaymentFormValues {
  visitId: number;
}

export interface VisitPayment {
  id: number;
  visitId: number;
  amount: number;
  note: string | null;
  createdAt: string;
}
