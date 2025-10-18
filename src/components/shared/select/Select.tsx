import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cn from "clsx";

export interface ControlledSelectOption<T> {
  value: T;
  label: string;
}

interface ControlledSelectProps<T extends FieldValues, TValue> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: any;
  className?: string;
  options: ControlledSelectOption<TValue>[];
  placeholder?: string;
}

export function ControlledSelect<T extends FieldValues, TValue>({
  name,
  control,
  rules,
  options,
  placeholder
}: ControlledSelectProps<T, TValue>) {
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
            <SelectTrigger className={cn("w-full", error && "border-red-400")}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
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
