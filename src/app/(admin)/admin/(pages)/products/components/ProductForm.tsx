import { ICategory } from "@/types/category.interface";
import React, { FC, useEffect } from "react";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import { ProductCreateDTO } from "@/types/product.interface";
import ControlledSelect from "@/components/shared/select/Select";
import Button from "../../../components/ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";

interface ProductFormProps {
  defaultValues?: Partial<ProductCreateDTO>;
  categories: ICategory[];
  submitText?: string;
  clearOnSubmit?: boolean;
  isFetchingCategories: boolean;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<ProductCreateDTO>;
}

const availableOptions = [
  { value: true, label: "Да" },
  { value: false, label: "Нет" },
];

const ProductForm: FC<ProductFormProps> = ({
  defaultValues,
  categories,
  submitText,
  isFetchingCategories,
  isSubmitting,
  clearOnSubmit,
  onSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm<ProductCreateDTO>({
    mode: "all",
    defaultValues: {
      ...defaultValues,
      published: defaultValues?.published ?? true,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id ?? "",
    label: cat.name,
  }));

  const handleFormSubmit: SubmitHandler<ProductCreateDTO> = (data) => {
    // console.log('ddd',data)
    onSubmit({
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
    if (clearOnSubmit) reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="name">Название</Label>
        <Field<ProductCreateDTO>
          name="name"
          control={control}
          rules={{
            required: "Заполните поле",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
            validate: (value) =>
              String(value).trim() !== "" || "Название не может быть пустым",
          }}
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Field<ProductCreateDTO>
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
        <Field<ProductCreateDTO>
          name="price"
          type="number"
          control={control}
          rules={{
            required: "Заполните поле",
          }}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Количество</Label>
        <Field<ProductCreateDTO>
          name="quantity"
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
          <ControlledSelect<ProductCreateDTO, string>
            name="categoryId"
            control={control}
            rules={{ required: "Заполните поле" }}
            options={categoryOptions}
            placeholder="Выберите котегорию"
          />
        )}
      </div>
      <div>
        <Label htmlFor="published">Опубликовать</Label>
        <ControlledSelect<ProductCreateDTO, boolean>
          name="published"
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
