import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type ConversationsProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
};

export default function Heading({
  bgColor = 'bg-black/10',
  description = 'Add some description as a prop',
  icon: Icon,
  iconColor = 'text-black',
  title = 'Ttile',
}: ConversationsProps) {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn('p-2 w-fit rounded-lg', bgColor)}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
