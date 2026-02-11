export interface PaymentFormValues {
  amount: number;
  note?: string;
}
export interface RefundFormValues {
  quantity: number;
}

export interface PaymentCreateDTO extends PaymentFormValues {
  visitId: number;
}

 