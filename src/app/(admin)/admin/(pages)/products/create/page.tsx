"use client";
import React from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import BreadCrumb from "../../../components/common/BreadCrumb";
import ProductForm from "../components/ProductForm";
import { useGetCategories } from "@/hooks/category/useCategories";
import { useCreateProduct } from "@/hooks/product/useProducts";

const ProductCreatePage = () => {
  const { categories, isFetchingCategories } = useGetCategories();
  const { createProduct, isCreatingProduct } = useCreateProduct();

  return (
    <>
      <BreadCrumb
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
