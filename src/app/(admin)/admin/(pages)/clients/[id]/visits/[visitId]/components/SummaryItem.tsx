import React, { ReactNode } from "react";

type SummaryItemProps = {
  label: string;
  children: ReactNode;
};

const SummaryItem = ({ label, children }: SummaryItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm text-gray-500">{label}: </p>
      <p className={` font-semibold`}>{children}</p>
    </div>
  );
};

export default SummaryItem;
