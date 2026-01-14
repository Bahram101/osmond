import { FC } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { CategoryCreateDTO } from "@/types/category.interface";

type CategoryFormProps = {
  closeModal: () => void;
  control: Control<CategoryCreateDTO>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleSaveCategory: (param: any) => void;
};

const CategoryForm: FC<CategoryFormProps> = ({
  closeModal,
  control,
  handleSubmit,
  handleSaveCategory,
}) => {
  return (
    <form onSubmit={handleSubmit(handleSaveCategory)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {/* {arrivalProduct.name} */}
      </h4>

      <div>
        <Label htmlFor="title">Название категории</Label>
        <Field
          name="title"
          control={control}
          rules={{
            required: "Заполните поле",
          }}
        />
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="xs" variant="outline" onClick={closeModal}>
          Закрыть
        </Button>
        <Button size="xs" type="submit">Создать</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
