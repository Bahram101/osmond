"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import Field from "@/components/shared/field/Field";
import Loader from "@/components/shared/Loader";
import { useProductSearch } from "@/hooks/product/useProductSearch";

const ProductSearch = () => {
  const router = useRouter();
  const { searchTerm, isLoading, control, products } = useProductSearch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: number) => {
    router.push(`/products/${id}`);
  };

  // 🔥 Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        // очищаем поле
        const input = document.querySelector(
          'input[name="searchTerm"]',
        ) as HTMLInputElement;

        if (input) input.value = "";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("isLoading", isLoading);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <Field
        placeholder="Ищите товары..."
        control={control}
        name="searchTerm"
      />

      {!!searchTerm && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="p-4">
              <Loader />
            </div>
          )}

          {!isLoading && products?.length === 0 && (
            <div className="p-3 text-gray-500">Ничего не найдено</div>
          )}

          {!isLoading &&
            products?.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition flex flex-wrap items-center gap-3"
              >
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">{p.price} ₸</div>
                <div className="text-sm text-gray-500 ">
                  {p.quantity > 0 ? (
                    <div className="text-green-600">Есть</div>
                  ) : (
                    <div className="text-red-400">Нет</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
