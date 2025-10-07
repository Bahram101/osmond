import React, { FC } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils/cn";

interface ILoader {
  className?: string;
}

const Loader: FC<ILoader> = ({ className }) => {
  return <Spinner className={cn('size-5',className)} />;
};

export default Loader;
