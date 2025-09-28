import cn from "clsx";
import React from "react";
import { Controller } from "react-hook-form";

import { IField } from "./field.interface";

const Field = <T extends Record<string, any>>({
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
          <div className={cn(className)}>
            <div
              className={cn(
                "m-0 bg-white rounded-lg border px-2",
                error ? "border-red-400" : "border-gray-300"
              )}
            >
              <input
                className="w-full p-2 outline-none"
                value={(value || "").toString()}
                onChange={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                {...rest}
              />
            </div>
            {error && <small className=" text-red-400">{error.message}</small>}
          </div>
        );
      }}
    />
  );
};

export default Field;
