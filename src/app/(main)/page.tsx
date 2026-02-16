"use client";
import Loader from "@/components/shared/Loader";
import { useGetSiteProducts } from "@/hooks/product/useSiteProducts";
import ProductList from "@/components/features/products/ProductList";

export default function Home() {
  const { products, isFetchingProducts } = useGetSiteProducts();

  if (isFetchingProducts) {
    return <Loader />;
  }

  return (
    <div className="">
      <ProductList
        products={products} 
      />
    </div>
  );
}
