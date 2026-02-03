import { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { ClientTypes, ClientFilterValues, ClientFormValues } from "@/types/client.interface";
import { Selector } from "@/components/shared/select/Selector";

type ClientFormProps = {
  closeModal: () => void;
  control: Control<ClientFormValues>;
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
          <Label htmlFor="fullName">Имя</Label>
          <Field<ClientFormValues>
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
          <Label htmlFor="username">Логин</Label>
          <Field<ClientFormValues>
            name="username"
            control={control}
            rules={{
              required: "Заполните поле",
              min: {
                value: 3, message: 'Минимум 3'
              }
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
                value: 3, message: 'Минимум 3'
              }
            }}
          />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Field<ClientFormValues>
            name="phone"
            control={control}
          />
        </div>
        <div>
          <Label htmlFor="note">Заметка</Label>
          <Field
            name="note"
            control={control}
          />
        </div>
        <div>
          <Label htmlFor="type">Тип клиента</Label>
          <Selector<ClientFormValues, Exclude<ClientTypes, "WALK_IN">>
            name="type"
            control={control}
            options={[
              { label: "Мастеры", value: "MASTER" },
              { label: "Оптовики", value: "WHOLESALER" },
            ]}
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs" type="submit">Сохранить</Button>
      </div>
    </form>
  );
};

export default ClientForm;
