import React, { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default LoginLayout;
