import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { IArrivalForm } from "@/types/arrival.interface";
import { IClientForm } from "@/types/client.interface";

type ClientFormProps = {
  closeModal: () => void;
  control: Control<IClientForm>;
  arrivalProduct: any;
  handleSubmit:UseFormHandleSubmit<FieldValues>
  handleClientFormSubmit:(param:any) => void
};

const ClientForm: FC<ClientFormProps> = ({
  closeModal,
  control,
  arrivalProduct,
  handleSubmit,
  handleClientFormSubmit
}) => {

  return (
    <form onSubmit={handleSubmit(handleClientFormSubmit)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {arrivalProduct.name}
      </h4>

      <div>
        <Label htmlFor="quantity">Количество</Label>
        <Field
          type="number"
          name="fullName"
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
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs">Добавить приход</Button>
      </div>
    </form>
  );
};

export default ClientForm;
