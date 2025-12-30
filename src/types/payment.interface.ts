export interface IPaymentForm {
  amount: number;
  note?: string;
}

export interface PaymentCreateDTO extends IPaymentForm {
  visitId: number;
}
