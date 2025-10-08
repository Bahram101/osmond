"use client";
import Loader from "@/components/shared/Loader";
import { AuthService } from "@/services/auth.service";
import { IUser } from "@/types/user.interface";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/auth")) {
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await AuthService.getMe();
        setUser(data);
      } catch {
        setUser(null);

        if (!pathname.startsWith("/auth")) {
          router.push("/auth/login");
        }
      }
    };

    fetchUser();
  }, [pathname, router]);

  const logout = async () => {
    try {
      await AuthService.logOut();
      setUser(null);
      router.push("/auth/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
