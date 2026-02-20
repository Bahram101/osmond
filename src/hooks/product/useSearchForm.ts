import { SearchFormData } from "@/components/common/search/search.interface";
import { useForm } from "react-hook-form";
import { useDebounce } from "../useDebounce";

export const useSearchForm = () => {
  const { control, watch } = useForm<SearchFormData>({
    mode: "onChange",
    defaultValues: { searchTerm: "" },
  });
  const searchTerm = watch("searchTerm");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return { searchTerm, debouncedSearch, control } 
};
