import { AuthService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  const { isPending: isLoading, data: currentUser } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => AuthService.getMe(),
  });

  return { isLoading, currentUser };
};
