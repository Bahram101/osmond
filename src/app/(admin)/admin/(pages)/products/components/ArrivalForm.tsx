import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, useForm, UseFormHandleSubmit } from "react-hook-form";
import { IArrivalForm } from "@/types/arrival-form.interface";

type ArrivalFormProps = {
  closeModal: () => void;
  control: Control<IArrivalForm>;
  arrivalProduct: any;
  handleSubmit:UseFormHandleSubmit<FieldValues>
  handleArrivalFormSubmit:(param:any) => void
};

const ArrivalForm: FC<ArrivalFormProps> = ({
  closeModal,
  control,
  arrivalProduct,
  handleSubmit,
  handleArrivalFormSubmit
}) => {
  console.log(arrivalProduct);
  return (
    <form onSubmit={handleSubmit(handleArrivalFormSubmit)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {arrivalProduct.name}
      </h4>

      <div>
        <Label htmlFor="quantity">Количество</Label>
        <Field
          name="quantity"
          type="number"
          control={control}
          rules={{
            required: "Заполните поле",
            min: {
              value: 1, message: 'Минимум 1'
            }
          }}
        />
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm">Добавить приход</Button>
      </div>
    </form>
  );
};

export default ArrivalForm;
