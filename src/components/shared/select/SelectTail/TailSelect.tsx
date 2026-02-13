"use client";

import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import BaseSelect from "./BaseSelect";

type Option = {
  value: string;
  label: string;
};

interface TailSelectProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  options: Option[];
  rules?: RegisterOptions<T>;
  placeholder?: string;
  className?: string;
}

export function TailSelect<T extends FieldValues>({
  name,
  control,
  options,
  rules,
  placeholder,
  className,
}: TailSelectProps<T>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => { 
        return (
          <div>
            <BaseSelect
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder={placeholder}
              className={className}
            />

            {fieldState.error && (
              <small className="text-red-400">{fieldState.error.message}</small>
            )}
          </div>
        );
      }}
    />
  );
}
