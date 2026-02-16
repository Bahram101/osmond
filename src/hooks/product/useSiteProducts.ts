import { ProductService } from "@/services/product.service"; 
import { SiteProductService } from "@/services/siteProduct.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSiteProducts = () => {
  const { data: products = [], isPending: isFetchingProducts } = useQuery({
    queryKey: ["get-products"],
    queryFn: () => SiteProductService.getAll(),
  });
  return { products, isFetchingProducts };
};
