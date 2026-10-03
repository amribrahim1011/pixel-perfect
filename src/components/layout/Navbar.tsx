import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from '@/lib/router-compat';
import { Menu, X, ChevronDown, User, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { brand } from '@/lib/brand';
import { mainNavItems } from '@/lib/navigation';
import { Button } from '@/components/ak-ui/Button';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ak-ui/Dropdown';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const isAuthenticated = !!user;
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url;
  const initials = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-base-950/90 backdrop-blur-md border-b border-base-700 shadow-card'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="container-ak flex h-16 items-center justify-between gap-4 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient font-display text-base-950 font-bold">
            {brand.shortName}
          </span>
          <span className="font-display text-lg font-bold tracking-wider text-ink-50">
            {brand.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNavItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-gold-300 bg-gold-500/10'
                    : 'text-ink-200 hover:text-gold-300 hover:bg-base-800'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 rounded-lg bg-base-800 border border-base-700 px-3 py-2 text-sm text-ink-200 hover:border-gold-700/50 transition-colors">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 text-xs font-medium">
                      {initials}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown size={16} className="text-ink-400" />
                </button>
              }
            >
              <DropdownItem icon={<LayoutDashboard size={16} />} onClick={() => navigate('/dashboard')}>
                Dashboard
              </DropdownItem>
              <DropdownItem icon={<User size={16} />} onClick={() => navigate('/dashboard/profile')}>
                Profile
              </DropdownItem>
              <DropdownItem icon={<Settings size={16} />} onClick={() => navigate('/dashboard/settings')}>
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem icon={<LogOut size={16} />} danger onClick={handleSignOut}>
                Sign Out
              </DropdownItem>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-ink-200 hover:text-gold-300 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-base-700 bg-base-950/95 backdrop-blur-md animate-slide-down">
          <div className="container-ak py-4 space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  location.pathname === item.to
                    ? 'text-gold-300 bg-gold-500/10'
                    : 'text-ink-200 hover:text-gold-300 hover:bg-base-800'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-base-700 pt-3 mt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 text-sm font-medium">
                        {initials}
                      </span>
                    )}
                    <span className="text-sm text-ink-200 truncate">{displayName}</span>
                  </div>
                  <Link to="/dashboard">
                    <Button variant="secondary" fullWidth>Dashboard</Button>
                  </Link>
                  <Button variant="ghost" fullWidth onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="secondary" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
