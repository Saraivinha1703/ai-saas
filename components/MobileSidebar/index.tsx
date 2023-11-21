'use client';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardSidebar } from '@/components/DashboardSidebar';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:bg-black/10 p-2 rounded-lg transition duration-200">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
