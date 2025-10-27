"use client";
import React from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Field from "@/components/shared/field/Field";
import ControlledSelect from "@/components/shared/select/Select";
import Button from "../../../components/ui/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICategory, ICategoryCreateDto } from "@/types/category.interface";
import {
  useCreateCategory,
  useGetCategories,
} from "@/hooks/category/useCategories";
import { toast } from "sonner";
import CategoryForm from "../components/CategoryForm";

const CategoryCreatePage = () => {

  const { categories, isFetchingCategories, refetch } = useGetCategories();
  const { createCategory, isCreatingCategory } = useCreateCategory(() => {
    // reset();
    refetch();
  });

  const categoryOptions = categories?.map((cat: ICategory) => ({
    value: cat.id ?? "",
    label: cat.name,
  }));

  // const onSubmit: SubmitHandler<ICategoryCreateDto> = (data) => {
  //   createCategory(data);
  //   toast.success("Категория успешно создана");
  // };

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Категории", href: "/admin/categories" },
          { label: "Создание категорию" },
        ]}
      />

      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <CategoryForm 
            isFetchingCategories={isFetchingCategories}
            categories={categories || []}
            onSubmit={(data) => createCategory(data)}
            isSubmitting={isCreatingCategory}
            submitText='Создать'
            clearOnSubmit
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CategoryCreatePage;
