import { request } from "@/lib/api/request.api";
import { IAuthFormData } from "@/types/auth.interface";
import { IUser } from "@/types/user.interface";

export const AuthService = {
  async login(data: IAuthFormData): Promise<IUser> {
    const response = await request<IUser>({
      url: "/auth/login",
      method: "POST",
      data,
    });
    return response;
  },

  async logOut(): Promise<{ message: string }> {
    const res = request<{ message: string }>({
      url: "/auth/logout",
      method: "POST",
    });
    return res;
  },

  async getMe(): Promise<IUser> {
    const response = request<IUser>({
      url: "/auth/me",
      method: "GET",
      showToast: false,
    });
    return response;
  },
};
