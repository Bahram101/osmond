"use client";

import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "@/lib/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option<T> = {
  label: string;
  value: T;
};

type Props<TField extends FieldValues, TValue> = {
  name: keyof TField;
  control: Control<TField>;
  rules?: RegisterOptions<TField>;
  options: Option<TValue>[];
  placeholder?: string;
  disabled?: boolean;
};

export function SelectShadcn<TField extends FieldValues, TValue extends string>({
  name,
  control,
  options,
  placeholder = "Выберите",
  disabled,
  rules,
}: Props<TField, TValue>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      defaultValue={options[0]?.value as any} // Добавляем defaultValue
      render={({ field, fieldState }) => (
        <div>
          <Select
            disabled={disabled}
            value={field.value || ""} // Используем пустую строку если значение undefined
            onValueChange={(value) => {
              field.onChange(value || options[0]?.value); // Устанавливаем первое значение если пусто
            }}
          >
            <SelectTrigger
              ref={field.ref}
              className={cn(
                "w-full",
                fieldState.error && "border-red-400"
              )}
            >
              <SelectValue placeholder={placeholder}>
                {options.find(opt => opt.value === field.value)?.label || placeholder}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}