"use client";
import BreadCrumb from "@/components/layout/BreadCrumb";
import {
  useGetCategoryBreadcrumb,
  useGetCategoryProducts,
} from "@/hooks/category/useCategories";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const catId = Number(id);

  const { categoryProducts, isFetchingCategoryProducts } =
    useGetCategoryProducts(catId);

  const { categoryBreadcrumb, isFetchingCatBreadcrumb } =
    useGetCategoryBreadcrumb(catId);

  console.log("breadcrumb", categoryBreadcrumb);

  return (
    <>
      <BreadCrumb
        items={categoryBreadcrumb.map((b) => ({
          label: b.name,
        }))}
      />
      <div className="divide-y border rounded-lg">
        {categoryProducts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50"
          >
            <div className="font-medium mr-4">{p.name}</div>

            <div className="flex items-center gap-6">
              <div className="font-semibold w-15">{p.price} ₸</div>

              <div
                className={`text-sm w-20 ${
                  p.quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {p.quantity > 0 ? "В наличии" : "Нет"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
