import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col">
      <h1 className={`mb-3 text-2xl font-semibold`}>CS Ternes U-18</h1>
      <div className="h-full">{children}</div>
    </div>
  );
};
