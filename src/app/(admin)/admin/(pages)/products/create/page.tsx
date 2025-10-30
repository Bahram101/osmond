"use client";
import React from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ProductForm from "../components/ProductForm";
import { useGetCategories } from "@/hooks/category/useCategories";
import { useCreateProduct } from "@/hooks/product/useProducts"; 

const ProductCreatePage = () => {
  const { categories, isFetchingCategories } = useGetCategories();
  const { createProduct, isCreatingProduct } = useCreateProduct();

  const availableOptions = [
    { value: true, label: "Да" },
    { value: false, label: "Нет" },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Товары", href: "/admin/products" },
          { label: "Создание товара" },
        ]}
      />
      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <ProductForm
            submitText="Создать"
            isFetchingCategories={isFetchingCategories}
            categories={categories || []}
            availableOptions={availableOptions || []}
            onSubmit={(data) => createProduct(data)}
            isSubmitting={isCreatingProduct}
            clearOnSubmit={true}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default ProductCreatePage;
