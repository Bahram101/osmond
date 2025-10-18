"use client";
import React from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Field from "@/components/shared/field/Field";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/ui/button/Button";
import { IProduct } from "@/types/product.interface";
import ControlledSelect from "@/components/shared/select/Select";

const categoryOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];
const availableOptions = [
  { value: true, label: "Да" },
  { value: false, label: "Нет" },
];

const ProductCreatePage = () => {
  const { control, handleSubmit } = useForm<IProduct>({
    mode: "all",
    defaultValues: {
      availability: true,
    },
  });

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    console.log(data);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Товары" />
      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <div>
            <Label htmlFor="name">Название</Label>
            <Field<IProduct>
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
            <Field<IProduct>
              name="description"
              control={control}
              rules={{
                // required: "Заполните поле",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
              }}
            />
          </div>
          <div>
            <Label htmlFor="price">Цена</Label>
            <Field<IProduct>
              name="price"
              control={control}
              rules={{
                required: "Заполните поле",
              }}
            />
          </div>
          <div>
            <Label htmlFor="categoryId">Категория</Label>
            <ControlledSelect
              name="categoryId"
              control={control}
              rules={{ required: "Заполните поле" }}
              options={categoryOptions}
              placeholder="Выберите котегорию"
            />
          </div>
          <div>
            <Label htmlFor="categoryId">Опубликовать</Label>
            <ControlledSelect<IProduct, boolean>
              name="availability"
              control={control}
              options={availableOptions || []}
              placeholder="Выберите доступность"
              // rules={{ required: "Заполните поле" }}
            />
          </div>

          <div className="flex justify-end">
            <Button
              size="xs"
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Создать
            </Button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default ProductCreatePage;
