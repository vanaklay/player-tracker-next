import type { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren & {
  title: string;
};
export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col">
      <h1
        className={`my-4 text-2xl font-semibold text-center underline underline-offset-8`}
      >
        {title}
      </h1>
      <div className="h-full">{children}</div>
    </div>
  );
};
