"use client";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuthMutation = () => {
  const router = useRouter();

  const { mutate: loginSync, isPending: isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return AuthService.login(email, password);
    },
    onSuccess(data) {
      console.log('datadata',data)
      // localStorage.setItem("accessToken", data.accessToken);

      // localStorage.setItem("user", JSON.stringify(data.user));
      // setUser(data.user);

      // toast.success("Вы успешно вошли");
      router.push("/");
    },
    onError(data) {
      console.log("auth error", data);
    },
  });

  return {
    loginSync,
    isLoading,
  };
};
