import { SaleService } from "@/services/sale.service";
import { useQuery } from "@tanstack/react-query";

export const useSale = () => {
  const { data: sales = [], isPending: isFetchingSales } = useQuery({
    queryKey: ["get-sales"],
    queryFn: () => SaleService.getAll(),
  });

  return { sales, isFetchingSales };
};
