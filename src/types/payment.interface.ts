export interface PaymentFormValues {
  amount: number;
  note?: string;
}

export interface PaymentCreateDTO extends PaymentFormValues {
  visitId: number;
}

 