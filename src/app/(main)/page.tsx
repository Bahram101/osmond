"use client";
import Loader from "@/components/shared/Loader";
import { useGetSiteProducts } from "@/hooks/product/useSiteProducts";
import ProductList from "@/components/features/products/ProductList";
import ProductSearch from "@/components/features/products/ProductSearch"; 

export default function Home() {
  // const { products, isFetchingProducts } = useGetSiteProducts();

  // if (isFetchingProducts) {
  //   return <Loader />;
  // }

  return (
    <div className="flex flex-col gap-5">
      
      <ProductSearch />

      {/* <ProductList
        products={products} 
      /> */}
    </div>
  );
}
