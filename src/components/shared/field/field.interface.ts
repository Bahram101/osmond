import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions
} from "react-hook-form";
import { InputHTMLAttributes } from "react";

export interface IField<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
