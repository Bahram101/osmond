import { FolderOpen } from "lucide-react";
import React, {ReactNode} from "react";

type Props = {
  icon?: ReactNode;
  text: string;
};

const EmptyState = ({icon, text }: Props) => {
  return (
    <div className="flex justify-center py-4 text-center text-gray-400">
      <div className="flex gap-2">
        {icon}
        {text}
      </div>
    </div>
  );
};

export default EmptyState;
