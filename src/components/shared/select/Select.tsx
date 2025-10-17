import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cn from 'clsx'

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
        <div>
          <Select value={value ?? ""} onValueChange={onChange}>
            <SelectTrigger className={cn("w-full", error && 'border-red-400')}>
              <SelectValue placeholder="Выберите котегорию" />
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
        </div>
      )}
    />
  );
}
export default ControlledSelect;
