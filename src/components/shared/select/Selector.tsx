"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "@/lib/utils/cn";

type Option<T> = {
  label: string;
  value: T;
};

type Props<TField extends FieldValues, TValue> = {
  name: keyof TField;
  control: Control<TField>;
  rules?: RegisterOptions<TField>;
  options: Option<TValue>[];
  disabled?: boolean;
};

export function Selector<TField extends FieldValues, TValue>({
  name,
  control,
  options,
  disabled,
  rules,
}: Props<TField, TValue>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const selected = options.find(
          (o) => o.value === field.value
        );
        return (
          <Combobox
            value={field.value != null ? String(field.value) : ""}
            onValueChange={(v) => {
              const option = options.find(
                (o) => String(o.value) === v
              );
              field.onChange(option?.value ?? null);
            }}
          >
            <ComboboxInput
              placeholder="Выберите"
              showClear
              disabled={disabled}
              value={selected?.label ?? ""}
              className={cn(
                "w-full",
                fieldState.error && "border-red-400"
              )}
            />

            <ComboboxContent>
              <ComboboxList>
                {options.map((item) => (
                  <ComboboxItem
                    key={String(item.value)}
                    value={String(item.value)}
                  >
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        );
      }}
    />
  );
}


