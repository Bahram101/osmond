import { cn } from "@/lib/utils/cn";
import { useParams } from "next/navigation";
import React from "react";

interface ComponentCardProps {
  title?: string | undefined;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {

  const router = useParams()
  console.log('router', router);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800   ${className}`}
    >
      {/* Card Header */}
      <div className={cn("px-6", title && 'py-5')}>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
          {title?.toUpperCase()}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className={cn("p-4 border-gray-100 dark:border-gray-800 sm:p-6", title && 'border-t')}>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
