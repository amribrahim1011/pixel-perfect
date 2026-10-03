/**
 * Navigation configuration — single source of truth for navbar and footer links.
 */
import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  to: string;
}

export const mainNavItems: NavItem[] = [
  { label: 'Games', to: '/games' },
  { label: 'Services', to: '/services' },
  { label: 'Deals', to: '/deals' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Become a Booster', to: '/become-a-booster' },
  { label: 'Support', to: '/support' },
];

export const footerNavItems: NavItem[] = [
  { label: 'Games', to: '/games' },
  { label: 'Services', to: '/services' },
  { label: 'Deals', to: '/deals' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Support', to: '/support' },
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Refund Policy', to: '/refund-policy' },
];

export interface DashboardNavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

export interface DashboardNavSection {
  title: string;
  items: DashboardNavItem[];
}
