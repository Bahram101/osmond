import { FC } from "react";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import Label from "@/app/(admin)/admin/components/form/Label";
import Button from "@/app/(admin)/admin/components/ui/button/Button";
import { RefundFormValues } from "@/types/payment.interface";

type RefundFormProps = {
  closeModal: () => void;
  control: Control<RefundFormValues>;
  handleRefundSubmit: UseFormHandleSubmit<FieldValues>;
  handleRefundFormSubmit: (param: any) => void;
};

const RefundForm: FC<RefundFormProps> = ({
  closeModal,
  control,
  handleRefundSubmit,
  handleRefundFormSubmit,
}) => {
  return (
    <form
      onSubmit={handleRefundSubmit(handleRefundFormSubmit)}
      className="flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="quantity">Количество к возврату</Label>
        <Field
          name="quantity"
          type="number"
          control={control}
          rules={{ 
            validate: (value) => Number(value) >= 1 || "Минимум 1" 
          }}
          // rules={{
          //   required: "Заполните поле",
          //   min: {
          //     value: 1,
          //     message: "Можно вернуть от 1 до X штук",
          //   },
          // }}
        />
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs" type="submit">
          Оформить
        </Button>
      </div>
    </form>
  );
};

export default RefundForm;
