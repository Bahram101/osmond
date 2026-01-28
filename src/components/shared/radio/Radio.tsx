"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils/cn";

import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  name: keyof T;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  options: Option[];
};

export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  rules,
  options,
}: Props<T>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <RadioGroup
          value={field.value ?? ""}
          onValueChange={field.onChange}
          className="flex gap-6"
        >
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                id={opt.value}
                value={opt.value}
                className={cn(
                  "cursor-pointer",
                  fieldState.error && "border-red-500 text-red-500",
                )}
              />
              <Label htmlFor={opt.value} className="cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}

export default FormRadioGroup;
