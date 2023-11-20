import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Navbar } from '@/components/Navbar';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type DashboardLayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function DashboardLayout({
  children,
  ...props
}: DashboardLayoutProps) {
  return (
    <div className="h-full relative">
      <DashboardSidebar>Hello</DashboardSidebar>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
