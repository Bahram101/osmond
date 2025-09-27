import Link from "next/link";
import React from "react";

const Notfound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Страница не найдена</h2>
      <p className="text-muted-foreground mt-2">
        Упс! Такой страницы не существует.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        На главную
      </Link>
    </div>
  );
};

export default Notfound;
