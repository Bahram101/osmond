"use client";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { IUser } from "@/types/user.interface";
import { AxiosError } from "axios";
import { IAuthFormData } from "@/types/auth.interface";

export const useAuthMutation = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const { mutate: loginSync, isPending: isLoading } = useMutation<
    IUser,
    AxiosError,
    IAuthFormData
  >({
    mutationKey: ["login"],
    mutationFn: (formData) => AuthService.login(formData),
    onSuccess(user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/");
    },
    onError(error) {
      console.log("auth error", error);
    },
  });

  return {
    loginSync,
    isLoading,
  };
};
