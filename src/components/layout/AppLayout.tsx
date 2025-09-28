"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Container from "@/components/shared/container";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authPaths = ["/auth/login", "/register", "/forgot-password"];

  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  return (
    <Container>
      <Header />
      <main className="main p-4 min-h-screen">{children}</main>
      <Footer />
    </Container>
  );
}
