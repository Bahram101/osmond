"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import ProductForm from "../../components/ProductForm";
import { useGetCategories } from "@/hooks/category/useCategories";
import { useParams } from "next/navigation";
import { useGetProduct, useUpdateProduct } from "@/hooks/product/useProducts";
import { ProductResponse } from "@/types/product.interface";
import Loader from "@/components/shared/Loader";

const ProductUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { categories, isFetchingCategories } = useGetCategories();
  const { product, isFetchingProduct } = useGetProduct(productId);
  const { updateProduct, isUpdatingProduct } = useUpdateProduct();

  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Товары", href: "/admin/products" },
          { label: "Редактирование товара" },
        ]}
      />
      <div className="grid xl:grid-cols-2">
        <ComponentCard title="Редактирование товара">
          {isFetchingProduct ? (
            <Loader />
          ) : (
            <ProductForm
              defaultValues={product as ProductResponse}
              isFetchingCategories={isFetchingCategories}
              categories={categories || []}
              submitText="Изменить"
              onSubmit={(data) => updateProduct({ id: productId as number, data })}
              isSubmitting={isUpdatingProduct}
            />
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default ProductUpdatePage;
