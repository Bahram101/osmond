import { FC } from "react";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import Label from "@/app/(admin)/admin/components/form/Label";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { PaymentFormValues } from "@/types/payment.interface";

type ArrivalFormProps = {
  closeModal: () => void;
  control: Control<PaymentFormValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handlePaymentFormSubmit: (param: any) => void;
};

const PaymentForm: FC<ArrivalFormProps> = ({
  closeModal,
  control,
  handleSubmit,
  handlePaymentFormSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit(handlePaymentFormSubmit)}
      className="flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="quantity">Сумма</Label>
        <Field
          name="amount"
          type="number"
          control={control}
          rules={{
            required: "Заполните поле",
            min: {
              value: 1,
              message: "Минимум 1",
            },
          }}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Заметки</Label>
        <Field name="note" control={control} />
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs">Принять</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
