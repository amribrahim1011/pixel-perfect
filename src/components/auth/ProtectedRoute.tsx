import { Navigate, useLocation } from '@/lib/router-compat';
import type { ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingOverlay } from '@/components/ak-ui/Loading';
import { Link } from '@/lib/router-compat';

interface ProtectedRouteProps {
  children: ReactNode;
  /** Signed-in user needs at least one of these permissions (from the database). */
  anyPermission?: string[];
}

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-base-950 flex items-center justify-center px-4">
      <div className="card-surface max-w-md w-full p-8 text-center">
        <ShieldAlert className="mx-auto text-danger-400" size={40} />
        <h1 className="mt-4 font-display text-2xl text-ink-50">Access denied</h1>
        <p className="mt-2 text-ink-300">Your account doesn't have permission to view this area.</p>
        <Link to="/dashboard" className="mt-6 inline-block text-gold-300 hover:text-gold-200">Go to your dashboard</Link>
      </div>
    </div>
  );
}

export function ProtectedRoute({ children, anyPermission }: ProtectedRouteProps) {
  const { user, loading, hasAnyPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-950">
        <LoadingOverlay label="Verifying your session…" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (anyPermission && anyPermission.length > 0 && !hasAnyPermission(anyPermission)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
