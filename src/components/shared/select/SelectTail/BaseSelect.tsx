"use client";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface BaseSelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const BaseSelect: React.FC<BaseSelectProps> = ({
  options,
  placeholder = "Select an option",
  value = "",
  onChange,
  className = "",
}) => {
  return (
    <select
      className={`h-9 w-full appearance-none rounded-lg border px-4 py-2 pr-11 text-sm shadow-theme-xs ${
        value
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {/* <option value="" disabled>
        {placeholder}
      </option> */}

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 rounded-lg"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default BaseSelect;
