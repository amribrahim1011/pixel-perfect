import { useState } from 'react';
import { Link, useLocation } from '@/lib/router-compat';
import type { ReactNode } from 'react';
import { Menu, X, LogOut, Bell } from 'lucide-react';
import { brand } from '@/lib/brand';
import { Button } from '@/components/ak-ui/Button';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';

export interface SidebarSection {
  title: string;
  /** Section shown only if the user has at least one of these database permissions. */
  anyPermission?: string[];
  items: { label: string; to: string; icon: ReactNode; anyPermission?: string[] }[];
}

interface DashboardShellProps {
  sections: SidebarSection[];
  brandLabel: string;
  children: ReactNode;
}

export function DashboardShell({ sections: allSections, brandLabel, children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { hasAnyPermission, loading } = useAuth();
  const allowed = (p?: string[]) => !p || p.length === 0 || (!loading && hasAnyPermission(p));
  const sections = allSections
    .filter((s) => allowed(s.anyPermission))
    .map((s) => ({ ...s, items: s.items.filter((i) => allowed(i.anyPermission)) }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-base-950">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 flex h-14 items-center justify-between border-b border-base-700 bg-base-950/90 px-4 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient font-display text-base-950 font-bold text-sm">
            {brand.shortName}
          </span>
          <span className="font-display text-sm font-bold tracking-wider text-ink-50">
            {brandLabel.toUpperCase()}
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-ink-200 hover:text-gold-300"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 w-64 shrink-0 border-r border-base-700 bg-base-900 transition-transform duration-300 lg:translate-x-0',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop brand */}
            <div className="hidden h-16 items-center gap-2.5 border-b border-base-700 px-6 lg:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient font-display text-base-950 font-bold text-sm">
                {brand.shortName}
              </span>
              <span className="font-display text-sm font-bold tracking-wider text-ink-50">
                {brandLabel.toUpperCase()}
              </span>
            </div>

            {/* Nav sections */}
            <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active =
                        location.pathname === item.to ||
                        (item.to !== `/${brandLabel.toLowerCase()}` && location.pathname.startsWith(item.to));
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-gold-500/10 text-gold-300'
                              : 'text-ink-300 hover:bg-base-800 hover:text-gold-300'
                          )}
                        >
                          <span className="shrink-0">{item.icon}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-base-700 p-3">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-300 hover:bg-base-800 hover:text-gold-300 transition-colors"
              >
                <LogOut size={18} />
                Back to Site
              </Link>
            </div>
          </div>
        </aside>

        {/* Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-base-950/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:pl-64">
          {/* Desktop top bar */}
          <div className="hidden h-16 items-center justify-end border-b border-base-700 bg-base-900/50 px-6 lg:flex">
            <button className="relative text-ink-300 hover:text-gold-300 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-base-950">
                0
              </span>
            </button>
            <div className="ml-4 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 text-sm font-medium">
                U
              </span>
            </div>
          </div>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
