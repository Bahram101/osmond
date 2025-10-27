"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import PageBreadcrumb from '@/app/(admin)/admin/components/common/PageBreadCrumb'
import ComponentCard from '@/app/(admin)/admin/components/common/ComponentCard'
import CategoryForm from '../../components/CategoryForm'
import { useGetCategories, useGetCategoryById, useUpdateCategory } from '@/hooks/category/useCategories'
import { toast } from 'sonner'
import Loader from '@/components/shared/Loader'
import { ICategory } from '@/types/category.interface'

const CategoryEditPage = () => {
  const { id } = useParams()

  const { categories, isFetchingCategories, refetch } = useGetCategories();
  const { category, isFetchingCategory } = useGetCategoryById(id as string);
  const { updateCategory, isUpdatingCategory } = useUpdateCategory(() => {
    toast.success('Категория успешно обновлена')
  })

  if (isFetchingCategory) return <Loader />;

  return (
    <>
      <PageBreadcrumb
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
            onSubmit={(data) => updateCategory({ id: id as string, data })}
            isSubmitting={isUpdatingCategory}
            submitText='Создать'
            clearOnSubmit
          />
        </ComponentCard>
      </div>
    </>
  );
}

export default CategoryEditPage