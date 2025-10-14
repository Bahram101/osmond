"use client";
import React from "react";
import AppSidebar from "./layout/AppSidebar";
import Backdrop from "./layout/Backdrop";
import AppHeader from "./layout/AppHeader";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import './globals.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ теперь всё, где используется useSidebar, находится внутри провайдера
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </SidebarProvider>
    </ThemeProvider>
  );
}

// 🔹 Вынеси внутреннюю часть отдельно, чтобы хук вызывался после провайдера
function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex font-sans">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto  md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
