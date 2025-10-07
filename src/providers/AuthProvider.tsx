"use client";
import { AuthService } from "@/services/auth.service";
import { IUser } from "@/types/user.interface";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  // isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    AuthService.getMe()
      .then((data) => {
        console.log("getMe data", data);
        // setUser(data.user);
        // localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
