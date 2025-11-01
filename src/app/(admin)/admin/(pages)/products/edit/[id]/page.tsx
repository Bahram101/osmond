"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import React from "react";
import ProductForm from "../../components/ProductForm";
import { useGetCategories } from "@/hooks/category/useCategories";
import { useParams } from "next/navigation";
import { useGetProduct } from "@/hooks/product/useProducts";
import { IProduct } from "@/types/product.interface";

const ProductUpdatePage = () => {
  const { id } = useParams();
  const { categories, isFetchingCategories } = useGetCategories();
  const { product, isFetchingProduct } = useGetProduct(id)


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
            defaultValues={product as IProduct}
            isFetchingCategories={isFetchingCategories}
            categories={categories || []}
            submitText="Изменить"
            // onSubmit={(data) => createProduct(data)}
            // isSubmitting={isCreatingProduct}

          />
        </ComponentCard>
      </div>
    </>
  );
};

export default ProductUpdatePage;
