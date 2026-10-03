import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Gamepad2,
  Users,
  ShieldCheck,
  FileText,
  Star,
  Flame,
  Ticket,
  LifeBuoy,
  DollarSign,
  Bell,
  Settings,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import type { SidebarSection } from '@/components/layout/DashboardShell';

const sections: SidebarSection[] = [
  {
    title: 'Operations',
    items: [
      { label: 'Overview', to: '/admin', icon: <LayoutDashboard size={18} /> },
      { label: 'Orders', to: '/admin/orders', icon: <ShoppingBag size={18} /> },
      { label: 'Services', to: '/admin/services', icon: <Package size={18} /> },
      { label: 'Categories', to: '/admin/categories', icon: <FolderTree size={18} /> },
      { label: 'Games', to: '/admin/games', icon: <Gamepad2 size={18} /> },
    ],
  },
  {
    title: 'People',
    items: [
      { label: 'Users', to: '/admin/users', icon: <Users size={18} /> },
      { label: 'Boosters', to: '/admin/boosters', icon: <ShieldCheck size={18} /> },
      { label: 'Applications', to: '/admin/booster-applications', icon: <FileText size={18} /> },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Payments', to: '/admin/payments', icon: <DollarSign size={18} /> },
      { label: 'Approved Withdrawals', to: '/admin/approved-withdrawals', icon: <CheckCircle2 size={18} /> },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Reviews', to: '/admin/reviews', icon: <Star size={18} /> },
      { label: 'Deals', to: '/admin/deals', icon: <Flame size={18} /> },
      { label: 'Coupons', to: '/admin/coupons', icon: <Ticket size={18} /> },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Support', to: '/admin/support', icon: <LifeBuoy size={18} /> },
      { label: 'Notifications', to: '/admin/notifications', icon: <Bell size={18} /> },
      { label: 'Settings', to: '/admin/settings', icon: <Settings size={18} /> },
      { label: 'Roles & Permissions', to: '/admin/roles-permissions', icon: <Crown size={18} /> },
    ],
  },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell sections={sections} brandLabel="Admin">
      {children}
    </DashboardShell>
  );
}
