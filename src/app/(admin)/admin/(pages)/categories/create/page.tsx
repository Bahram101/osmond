"use client";
import React from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import {
  useCreateCategory,
  useGetCategories,
} from "@/hooks/category/useCategories";
import CategoryForm from "../components/CategoryForm";
import { toast } from "sonner";

const CategoryCreatePage = () => {

  const { categories, isFetchingCategories, refetch } = useGetCategories();
  const { createCategory, isCreatingCategory } = useCreateCategory(() => {
    refetch();
    toast.success('Категория успешно обновлена')
  });

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
