"use client";
import React from "react";
import { useParams } from "next/navigation";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import CategoryForm from "../../components/CategoryForm";
import {
  useGetCategories,
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";
import { ICategory } from "@/types/category.interface";

const CategoryEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { categories, isFetchingCategories } = useGetCategories();
  const { category, isFetchingCategory } = useGetCategoryById(numericId);
  const { updateCategory, isUpdatingCategory } = useUpdateCategory();

  if (isFetchingCategory) return <Loader />;

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Категории", href: "/admin/categories" },
          { label: "Редактирование категорию" },
        ]}
      />

      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Редактирование категории">
          <CategoryForm
            defaultValues={category as ICategory}
            isFetchingCategories={isFetchingCategories}
            categories={categories || []}
            onSubmit={(data) =>
              updateCategory({ id: numericId as number, data })
            }
            isSubmitting={isUpdatingCategory}
            submitText="Изменить"
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CategoryEditPage;
