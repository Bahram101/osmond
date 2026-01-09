"use client";
import { useGetCategoryProducts } from "@/hooks/category/useCategories";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const catId = Number(id);

  const { categoryProducts, isFetchingCategoryProducts } =
    useGetCategoryProducts(catId);

    console.log('categoryProducts', categoryProducts);
  return <div>CategoryPage</div>;
};

export default CategoryPage;
