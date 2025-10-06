import { request } from "@/lib/request.api";

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await request({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
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
    return response;
  },
};
