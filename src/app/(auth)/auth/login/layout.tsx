import React, { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-gray-100 min-h-screen flex">{children}</div>;
};

export default LoginLayout;
