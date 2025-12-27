import React, { ReactNode } from "react";

type SummaryItemProps = {
  label: string;
  children: ReactNode;
};

const SummaryItem = ({ label, children }: SummaryItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="">{label}: </p>
      <p className={`text-[17px] font-semibold`}>{children}</p>
    </div>
  );
};

export default SummaryItem;
