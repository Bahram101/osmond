"use client";
import Loader from "@/components/shared/Loader";
import CategoryTree from "@/components/features/category/CategoryTree";
import { useGetCategoriesTree } from "@/hooks/category/useCategories"; 

export default function Home() {
  const { categoriesTree, isFetchingCategoriesTree } = useGetCategoriesTree();

  if (isFetchingCategoriesTree) {
    return <Loader />;
  }

  return (
    <div className="">
      <CategoryTree categoriesTree={categoriesTree} />
    </div>
  );
}
