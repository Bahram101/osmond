import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string; // если есть, будет <Link>, если нет — просто текст
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadCrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {items[items.length - 1].label}
      </h2>

      <nav>
        <ol className="flex items-center gap-1.5">
          {items?.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 underline underline-offset-4"
                  >
                    {item.label}
                    <ChevronRight size='18'/>
                  </Link>
                ) : (
                  <span className="text-sm text-gray-800 dark:text-white/90">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
