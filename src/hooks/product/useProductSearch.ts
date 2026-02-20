import { useQuery } from "@tanstack/react-query";
import { useSearchForm } from "./useSearchForm";
import { SiteProductService } from "@/services/siteProduct.service";

export const useProductSearch = () => {
  const { searchTerm, debouncedSearch, control } = useSearchForm();

  const { data: products, isLoading } = useQuery({
    queryKey: ["search products", debouncedSearch],
    queryFn: () => SiteProductService.search(debouncedSearch),
    // enabled: debouncedSearch?.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { products: products ?? [], isLoading, control, searchTerm };
};
