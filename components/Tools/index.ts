import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-react';

export const tools = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generator',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    label: 'Video Generator',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Music Generator',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code Generator',
    icon: Code,
    href: '/code',
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-gray-200',
  },
];
