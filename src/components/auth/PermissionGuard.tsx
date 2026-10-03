import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface PermissionGuardProps {
  /** Show children only if the user has this permission. */
  permission?: string;
  /** ...or any of these permissions. */
  anyOf?: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

/** Hides UI the signed-in user isn't permitted to use. Display only — the database enforces access. */
export function PermissionGuard({ permission, anyOf, fallback = null, children }: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, loading } = useAuth();
  if (loading) return null;
  const ok = (permission ? hasPermission(permission) : true) && (anyOf ? hasAnyPermission(anyOf) : true);
  return <>{ok ? children : fallback}</>;
}
