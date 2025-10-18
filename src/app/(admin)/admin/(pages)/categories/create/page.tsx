"use client";
import React from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import ControlledSelect from "@/components/shared/select/Select";
import Button from "../../../components/ui/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICategory } from "@/types/category.interface";

const CategoryCreatePage = () => {
  const { control, handleSubmit } = useForm<ICategory>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<ICategory> = (data) => {
    console.log(data);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Товары" />
      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <div>
            <Label htmlFor="name">Название</Label>
            <Field<ICategory>
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
            <Label htmlFor="categoryId">Опубликовать</Label>
            <ControlledSelect<ICategory, string>
              name="categoryId"
              control={control}
              options={[]}
              placeholder="Выберите категорию"
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

export default CategoryCreatePage;
