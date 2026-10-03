import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  DollarSign,
  ArrowDownToLine,
  User,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import type { SidebarSection } from '@/components/layout/DashboardShell';

const sections: SidebarSection[] = [
  {
    title: 'Booster',
    items: [
      { label: 'Overview', to: '/booster', icon: <LayoutDashboard size={18} /> },
      { label: 'Available Orders', to: '/booster/orders', icon: <ShoppingBag size={18} /> },
      { label: 'Earnings', to: '/booster/earnings', icon: <DollarSign size={18} /> },
      { label: 'Withdrawals', to: '/booster/withdrawals', icon: <ArrowDownToLine size={18} /> },
      { label: 'Profile', to: '/booster/profile', icon: <User size={18} /> },
    ],
  },
];

export function BoosterLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell sections={sections} brandLabel="Booster">
      {children}
    </DashboardShell>
  );
}
