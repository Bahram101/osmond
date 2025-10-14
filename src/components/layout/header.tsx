"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import Image from "next/image";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import Skeleton from "../shared/Skeleton";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="px-4 py-4 border-b border-zinc-200 items-center justify-between flex">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image src="/logo.png" alt="Логотип" fill unoptimized priority />
        </div>

        <span className="font-semibold text-lg opacity-80">Osmond</span>
      </Link>
      <nav>
        <ul className="flex gap-3 items-center justify-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/admin">Админ</Link>
          </li>

          {user ? (
            <Menubar className="border-none shadow-none p-0">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer p-0">
                  <Image
                    alt="Логотип"
                    src="/account.png"
                    width={23}
                    height={23}
                    priority
                    unoptimized
                  />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarRadioItem value="andy">
                    {user.username}
                  </MenubarRadioItem>

                  <MenubarRadioGroup value="benoit">
                    <MenubarRadioItem value="andy" className="cursor-pointer">
                      Профиль
                    </MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarItem
                    inset
                    className="cursor-pointer"
                    onClick={logout}
                  >
                    Выйти
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Skeleton />
          )}
        </ul>
      </nav>
    </header>
  );
};
