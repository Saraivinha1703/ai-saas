'use client';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools } from '../Tools';

type DashboardSidebarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function DashboardSidebar({
  children,
  ...props
}: DashboardSidebarProps) {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        'space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white',
        props.className
      )}
      {...props}
    >
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              src="/logo.png"
              fill
              alt="Logo"
              sizes="(max-width: 768px)"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold">Thinker</h1>
        </Link>
        <div className="space-y-1">
          {tools.map(tool => (
            <Link
              href={tool.href}
              key={tool.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-light hover:bg-white/10 rounded-lg transition duration-200',
                pathname === tool.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <tool.icon className={cn('h-5 w-5 mr-3', tool.color)} />
                <p>{tool.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
