"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CategoryNode } from "@/types/category.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  category: CategoryNode;
}

export function CategoryTreeItem({ category }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hasChildren = category.children.length > 0;

  const handleClickCategory = (e: React.MouseEvent) => { 
    if (!hasChildren) {
      router.push(`/categories/${category.id}`);
    }
  };

  return (
    <div className="pl-2">
      <div
        className={cn(
          "flex items-center gap-1 cursor-pointer select-none py-1 rounded hover:bg-gray-100"
        )}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "transition-transform duration-200 ease-in-out",
              open ? "rotate-90 " : ""
            )}
            size={16}
          />
        ) : (
          <span className="w-4" />
        )}

        <span
          className="text-sm"
          onClick={handleClickCategory}
        >
          {category.name}
        </span>
      </div>

      {open && hasChildren && (
        <div className="ml-4  ">
          {category.children.map((child) => (
            <CategoryTreeItem key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
}
