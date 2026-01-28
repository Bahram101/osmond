"use client";
import React from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
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

// const options = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

type Option<T = string> = {
  label: string;
  value: T;
};

type Props<T extends FieldValues> = {
  name: keyof T;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  options: Option<number>[];
  disabled?: boolean;
};

export function Selector<T extends FieldValues>({
  name,
  control,
  options,
  disabled,
  rules,
}: Props<T>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const selected = options.find((o) => o.value === field.value);
        console.log("error", error);

        return (
          <>
            <Combobox
              value={field.value ? String(field.value) : ""}
              onValueChange={(v) => field.onChange(v ? Number(v) : undefined)}
            >
              <ComboboxInput
                placeholder="Выберите"
                showClear
                disabled={disabled}
                value={selected?.label ?? ""}
                className={cn("w-full", error && "border-red-400")}
              />

              <ComboboxContent>
                {/* <ComboboxEmpty>Не найдено</ComboboxEmpty> */}
                <ComboboxList>
                  {options.map((item) => (
                    <ComboboxItem key={item.value} value={String(item.value)}>
                      {item.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {/* {fieldState.error && <small className=" text-red-400">{fieldState.error.message}</small>} */}
          </>
        );
      }}
    />
  );
}
