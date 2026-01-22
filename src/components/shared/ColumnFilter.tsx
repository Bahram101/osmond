import React from "react";
import { Input } from "../ui/input";

const ColumnFilter = ({ column }: any) => {
  return (
    <Input
      className="bg-white font-normal"
      value={(column.getFilterValue() as number) ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
};

export default ColumnFilter;
