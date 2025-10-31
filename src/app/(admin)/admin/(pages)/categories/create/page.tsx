"use client";
import React from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import {
  useCreateCategory,
  useGetCategories,
} from "@/hooks/category/useCategories";
import CategoryForm from "../components/CategoryForm"; 

const CategoryCreatePage = () => {
  const { categories, isFetchingCategories } = useGetCategories();
  const { createCategory, isCreatingCategory } = useCreateCategory();

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Категории", href: "/admin/categories" },
          { label: "Создание категорию" },
        ]}
      />

      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <CategoryForm
            submitText='Создать' 
            isFetchingCategories={isFetchingCategories}
            categories={categories || []}
            onSubmit={(data) => createCategory(data)}
            isSubmitting={isCreatingCategory}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CategoryCreatePage;
