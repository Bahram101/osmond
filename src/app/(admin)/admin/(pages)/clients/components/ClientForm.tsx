"use client";
import { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import {
  ClientFormValues,
} from "@/types/client.interface";
import { TailSelect } from "@/components/shared/select/SelectTail/TailSelect";

type ClientFormProps = {
  closeModal: () => void;
  control: Control<ClientFormValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleClientFormSubmit: (param: any) => void;
};

const ClientForm: FC<ClientFormProps> = ({
  closeModal,
  control,
  handleSubmit,
  handleClientFormSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(handleClientFormSubmit)}>
      <div className="flex flex-col gap-3 pt-5">
        <div>
          <Label htmlFor="fullName">Имя</Label>
          <Field<ClientFormValues>
            name="fullName"
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
          <Label htmlFor="username">Логин</Label>
          <Field<ClientFormValues>
            name="username"
            control={control}
            rules={{
              required: "Заполните поле",
              min: {
                value: 3,
                message: "Минимум 3",
              },
            }}
          />
        </div>
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Field<ClientFormValues>
            name="password"
            control={control}
            rules={{
              required: "Заполните поле",
              min: {
                value: 3,
                message: "Минимум 3",
              },
            }}
          />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Field<ClientFormValues> name="phone" control={control} />
        </div>
        <div>
          <Label htmlFor="note">Заметка</Label>
          <Field<ClientFormValues> name="note" control={control} />
        </div>

        <div>
          <Label htmlFor="type">Тип клиента</Label>
          <TailSelect<ClientFormValues>
            name="type"
            control={control}
            rules={{ required: "Выберите тип клиента" }}
            placeholder="Выберите тип клиента"
            options={[
              { label: "Мастер", value: "MASTER" },
              { label: "Оптовик", value: "WHOLESALER" },
            ]}
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
