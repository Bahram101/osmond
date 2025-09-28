import { Input } from "@/components/ui/input";
import { IAuthFormData } from "@/types/auth.interface";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { handleSubmit, control } = useForm<IAuthFormData>({
    mode: "onChange",
  });

  

  return (
    <div className="p-6 bg-white w-80 self-center mx-auto">
      <Input />
    </div>
  );
};

export default LoginPage;
