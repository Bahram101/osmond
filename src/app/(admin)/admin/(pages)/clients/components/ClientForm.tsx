import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form"; 
import { IClientForm } from "@/types/client.interface";

type ClientFormProps = {
  closeModal: () => void;
  control: Control<IClientForm>;
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleClientFormSubmit: (param: any) => void
};

const ClientForm: FC<ClientFormProps> = ({
  closeModal,
  control,
  handleSubmit,
  handleClientFormSubmit
}) => {

  return (
    <form onSubmit={handleSubmit(handleClientFormSubmit)}>
      <div className="flex flex-col gap-3 pt-5">
        <div>
          <Label htmlFor="quantity">Имя</Label>
          <Field
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

        <div>
          <Label htmlFor="quantity">Телефон</Label>
          <Field
            name="phone"
            control={control}
            // rules={{
            //   required: "Заполните поле",
            // }}
          />
        </div>

        <div>
          <Label htmlFor="quantity">Заметка</Label>
          <Field
            name="note"
            control={control} 
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs">Создать клиент</Button>
      </div>
    </form>
  );
};

export default ClientForm;
