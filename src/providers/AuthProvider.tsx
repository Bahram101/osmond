// import { IUser } from "@/types/user.interface";
// import React, { createContext, ReactNode, useState } from "react";

import { AuthService } from "@/services/auth.service";
import { IUser } from "@/types/user.interface";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    AuthService.getMe()
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
