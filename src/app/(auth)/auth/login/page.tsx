"use client";
import Field from "@/components/shared/field/Field";
import { Button } from "@/components/ui/button";
import { validEmail } from "@/lib/utils/helpers";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthMutation } from "@/hooks/auth/useAuthMutation";
import Loader from "@/components/shared/Loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: {
      email: "bahram101@mail.ru",
      password: "123456",
    },
  });

  const { isLoading, loginSync } = useAuthMutation();

  const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
    await loginSync(data);
    router.push("/");
  };

  return (
    <>
      <Card className="w-full max-w-sm mx-auto self-center ">
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Field<IAuthFormData>
                  className=""
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
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Field<IAuthFormData>
                  className=""
                  control={control}
                  name="password"
                  type="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Please enter a valid password",
                    },
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full cursor-pointer"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Loader /> : "Войти"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginPage;
