import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ControlledSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: any;
  className?: string;
}

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  rules,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <small className=" text-red-400">{error.message}</small>}
        </>
      )}
    />
  );
}
export default ControlledSelect;
