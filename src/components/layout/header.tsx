"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="px-4 py-4 border-b border-zinc-200 items-center justify-between flex">
      <Link href="/" className="flex items-center gap-3">
        <Image alt="Логотип" src="/logo.png" width={40} height={40} priority />
        <span className="font-semibold text-lg">Osmond</span>
      </Link>
      <nav>
        <ul className="flex gap-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/admin">Админ</Link>
          </li>
          {session && (
            <li>
              <button className="cursor-pointer" onClick={() => signOut()}>
                Выйти
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
