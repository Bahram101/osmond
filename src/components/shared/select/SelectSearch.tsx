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
      render={({ field }) => {
        // Combobox работает ТОЛЬКО с label
        const labels = options.map((o) => o.label);

        return (
          <Combobox
            items={labels}
            onValueChange={(label) => {
              const option = options.find(
                (o) => o.label === label
              );
              field.onChange(option?.value); // RHF ← id
            }}
          >
            <ComboboxInput showClear placeholder="Выберите" />

            <ComboboxContent>
              <ComboboxEmpty>Не найдено</ComboboxEmpty>

              <ComboboxList>
                {(label) => (
                  <ComboboxItem key={label} value={label}>
                    {label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        );
      }}
    />
  );
}
