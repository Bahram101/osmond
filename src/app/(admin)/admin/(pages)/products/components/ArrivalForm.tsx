import { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { IArrivalForm } from "@/types/arrival.interface";

type ArrivalFormProps = {
  closeModal: () => void;
  control: Control<IArrivalForm>;
  arrivalProduct: any;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleArrivalFormSubmit: (param: any) => void;
};

const ArrivalForm: FC<ArrivalFormProps> = ({
  closeModal,
  control,
  arrivalProduct,
  handleSubmit,
  handleArrivalFormSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(handleArrivalFormSubmit)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {arrivalProduct.name}
      </h4>

      <div className="relative w-full">
        <div>
          <Label htmlFor="quantity">Количество</Label>
          <Field
            name="qty"
            type="number"
            control={control}
            min={1}
            step={1}
            rules={{
              required: "Заполните поле",
              min: {
                value: 1,
                message: "Минимум 1",
              },
            }}
          />
        </div>
        <span className="pointer-events-none absolute right-7 top-1/2 -translate-y text-gray-500">
          шт.
        </span>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs" type="submit">
          Оприходовать
        </Button>
      </div>
    </form>
  );
};

export default ArrivalForm;
