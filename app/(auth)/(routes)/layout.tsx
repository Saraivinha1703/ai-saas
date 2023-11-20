import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type AuthLayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function AuthLayout({ children, ...props }: AuthLayoutProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center h-full',
        props.className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
