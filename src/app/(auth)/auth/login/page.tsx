"use client";
import Field from "@/components/shared/field/Field";
import { Button } from "@/components/ui/button";
import { validEmail } from "@/lib/helpers";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthMutation } from "./useAuthMutation";

const LoginPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues:{
      email: 'bahram101@mail.ru',
      password: '123456'
    }
  });

  const { isLoading, loginSync } = useAuthMutation();

  const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
    await loginSync(data);
    router.push("/");
  };

  return (
    <div className="p-6 bg-white w-80 self-center mx-auto rounded shadow-md">
      <h1 className="text-xl font-semibold text-center mb-3">Login</h1>
      {/* {message && <span className="text-red-400 mb-3 block">{message}</span>} */}

      <Field<IAuthFormData>
        className="mb-3"
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: validEmail,
            message: "Please enter a valid email",
          },
        }}
      />
      <Field<IAuthFormData>
        className="mb-3"
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Please enter a valid password",
          },
        }}
      />
      <Button className="w-full" onClick={handleSubmit(onSubmit)}>
        {isLoading ? "Loading..." : "Войти"}
      </Button>
    </div>
  );
};

export default LoginPage;
