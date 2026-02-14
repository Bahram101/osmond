"use client";
import ComponentCard from "../../../components/common/ComponentCard";
import BreadCrumb from "../../../components/common/BreadCrumb";
import ProductForm from "../components/ProductForm";
import { useGetCategories, useGetCategoriesTree } from "@/hooks/category/useCategories";
import { useCreateProduct } from "@/hooks/product/useProducts";

const ProductCreatePage = () => {
  // const { categories, isFetchingCategories } = useGetCategories();
  // const { categoriesTree, isFetchingCategoriesTree } = useGetCategoriesTree();
  const { createProduct, isCreatingProduct } = useCreateProduct();

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Склад", href: "/admin/products" },
          { label: "Создать товара" },
        ]}
      />
      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Создание товара">
          <ProductForm
            submitText="Создать"
            // isFetchingCategories={isFetchingCategoriesTree}
            // categories={categoriesTree || []}
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
