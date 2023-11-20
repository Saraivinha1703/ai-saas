import clsx from 'clsx';

type DashboardSidebarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function DashboardSidebar({
  children,
  ...props
}: DashboardSidebarProps) {
  return (
    <div
      className={clsx(
        'hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900',
        props.className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
