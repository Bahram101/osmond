"use client";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
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
            <Link href="/admin">Админ</Link>
          </li>
          <li>
            <Link href="/asdf">Asdf</Link>
          </li>
          <li>
            <button className=" cursor-pointer">Выйти</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
