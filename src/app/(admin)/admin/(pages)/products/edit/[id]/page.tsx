"use client";
import BreadCrumb from "@/app/(admin)/admin/components/common/BreadCrumb";
import ComponentCard from "@/app/(admin)/admin/components/common/ComponentCard";
import ProductForm from "../../components/ProductForm";
import { useParams } from "next/navigation";
import { useGetProduct, useUpdateProduct } from "@/hooks/product/useProducts";
import { ProductResponse } from "@/types/product.interface";
import Loader from "@/components/shared/Loader";

const ProductUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  // const { categoriesTree, isFetchingCategoriesTree } = useGetCategoriesTree();
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
              isEditMode={Boolean(id)}
              defaultValues={product as ProductResponse}
              // isFetchingCategories={isFetchingCategoriesTree}
              // categories={categoriesTree || []}
              submitText="Изменить"
              onSubmit={(data) =>
                updateProduct({ id: productId as number, data })
              }
              isSubmitting={isUpdatingProduct}
            />
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default ProductUpdatePage;
