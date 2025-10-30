import { ICategory } from "@/types/category.interface";
import React, { FC } from "react";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { availableOptionsType, IProductCreateDto } from "@/types/product.interface";
import ControlledSelect from "@/components/shared/select/Select";
import Button from "../../../components/ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";

interface ProductFormProps {
  defaultValues?: Partial<IProductCreateDto>;
  categories: ICategory[];
  availableOptions: availableOptionsType[];
  submitText?: string;
  clearOnSubmit?: boolean;
  isFetchingCategories: boolean;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<IProductCreateDto>;
}


const ProductForm: FC<ProductFormProps> = ({
  defaultValues,
  categories,
  availableOptions,
  submitText,
  isFetchingCategories,
  isSubmitting,
  clearOnSubmit,
  onSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm<IProductCreateDto>({
    mode: "all",
    defaultValues: {
      ...defaultValues,
      availability: true,
    },
  });

  const categoryOptions = categories.map((cat) => ({
    value: cat.id ?? "",
    label: cat.name,
  }));

  const handleFormSubmit: SubmitHandler<IProductCreateDto> = (data) => {
    onSubmit(data);
    if (clearOnSubmit) reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="name">Название</Label>
        <Field<IProductCreateDto>
          name="name"
          control={control}
          rules={{
            required: "Заполните поле",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
          }}
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Field<IProductCreateDto>
          name="description"
          control={control}
          rules={{
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
          }}
        />
      </div>
      <div>
        <Label htmlFor="price">Цена</Label>
        <Field<IProductCreateDto>
          name="price"
          type="number"
          control={control}
          rules={{
            required: "Заполните поле",
          }}
        />
      </div>
      <div>
        <Label>Категория</Label>
        {isFetchingCategories ? (
          <Loader />
        ) : (
          <ControlledSelect<IProductCreateDto, string>
            name="categoryId"
            control={control}
            rules={{ required: "Заполните поле" }}
            options={categoryOptions}
            placeholder="Выберите котегорию"
          />
        )}
      </div>
      <div>
        <Label htmlFor="availability">Опубликовать</Label>
        <ControlledSelect<IProductCreateDto, boolean>
          name="availability"
          control={control}
          options={availableOptions || []}
          placeholder="Выберите доступность"
        />
      </div>

      <div className="flex justify-end">
        <Button size="xs" variant="primary">
          {isSubmitting ? <Loader /> : ""}
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
