import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Navbar } from '@/components/Navbar';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type DashboardLayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900 text-white">
        <DashboardSidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
