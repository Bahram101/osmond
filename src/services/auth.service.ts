import { request } from "@/lib/api/request.api";
import { IAuthFormData } from "@/types/auth.interface";
import { IUser } from "@/types/user.interface";

export const AuthService = {
  async login(data: IAuthFormData): Promise<IUser> {
    try {
      const response = await request<IUser>({
        url: "/auth/login",
        method: "POST",
        data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  async getMe() {
    const response = await request({
      url: "/auth/me",
      method: "GET",
    });
    console.log("getMe response", response);
    return response;
  },
};
