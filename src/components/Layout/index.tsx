import type { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren & {
  title: string;
};
const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="m-auto flex min-h-full w-full flex-col md:w-2/3">
      <h1
        className={`my-4 text-center text-2xl font-semibold underline underline-offset-8`}
      >
        {title}
      </h1>
      <div className="h-full">{children}</div>
    </div>
  );
};

export default Layout;
