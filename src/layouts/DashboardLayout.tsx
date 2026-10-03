import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Loader,
  History,
  MessageSquare,
  LifeBuoy,
  Star,
  User,
  Settings,
  Rocket,
  ShieldCheck,
  Crown,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import type { SidebarSection } from '@/components/layout/DashboardShell';

const sections: SidebarSection[] = [
  {
    title: 'Main',
    items: [
      { label: 'Overview', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Active Orders', to: '/dashboard/active-orders', icon: <Loader size={18} /> },
      { label: 'All Orders', to: '/dashboard/orders', icon: <ShoppingBag size={18} /> },
      { label: 'Order History', to: '/dashboard/order-history', icon: <History size={18} /> },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Messages', to: '/dashboard/messages', icon: <MessageSquare size={18} /> },
      { label: 'Support', to: '/dashboard/support', icon: <LifeBuoy size={18} /> },
      { label: 'Reviews', to: '/dashboard/reviews', icon: <Star size={18} /> },
      { label: 'Profile', to: '/dashboard/profile', icon: <User size={18} /> },
      { label: 'Settings', to: '/dashboard/settings', icon: <Settings size={18} /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Booster Panel', to: '/booster', icon: <Rocket size={18} />, anyPermission: ['booster_panel.access'] },
      { label: 'Admin Panel', to: '/admin', icon: <ShieldCheck size={18} />, anyPermission: ['admin_panel.access'] },
      { label: 'Roles & Permissions', to: '/admin/roles-permissions', icon: <Crown size={18} />, anyPermission: ['roles.view'] },
    ],
  },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell sections={sections} brandLabel="Dashboard">
      {children}
    </DashboardShell>
  );
}
