import cn from "clsx";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";

import { IField } from "./field.interface";
import { Input } from "@/components/ui/input";

const Field = <T extends FieldValues>({
  control,
  name,
  rules,
  className,
  ...rest
}: IField<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <div className={cn(className)} suppressHydrationWarning>
            <Input
              // {...field}
              {...rest}
              className={cn(error && "border-red-400")}
              id={String(name)}
              name={name}
              value={(value || "").toString()}
              onChange={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
            />
            {error && <small className=" text-red-400">{error.message}</small>}
          </div>
        );
      }}
    />
  );
};

export default Field;
