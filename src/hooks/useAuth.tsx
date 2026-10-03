import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';
import type { AuthUser, AuthContextValue, AppRole } from '@/types/auth';

const ROLE_ORDER: AppRole[] = ['owner', 'co_owner', 'admin', 'trusted_booster', 'booster', 'user'];
function highestRole(roles: AppRole[]): AppRole | null {
  return ROLE_ORDER.find((r) => roles.includes(r)) ?? null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);

  const fetchAccess = useCallback(async (userId: string) => {
    const [rolesRes, permsRes] = await Promise.all([
      supabase.from('user_roles').select('roles(slug)').eq('user_id', userId),
      supabase.rpc('get_my_permissions'),
    ]);
    if (rolesRes.error) console.error('[Auth] Failed to fetch roles:', rolesRes.error.message);
    if (permsRes.error) console.error('[Auth] Failed to fetch permissions:', permsRes.error.message);
    const r = (rolesRes.data ?? [])
      .map((row) => (row as unknown as { roles: { slug: string } | null }).roles?.slug)
      .filter((x): x is AppRole => !!x);
    const pm = ((permsRes.data ?? []) as unknown as (string | { get_my_permissions: string })[]).map((x) =>
      typeof x === 'string' ? x : x.get_my_permissions,
    );
    return { roles: r, permissions: pm };
  }, []);

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('[Auth] Failed to fetch profile:', error.message);
      return null;
    }
    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return;
    const p = await fetchProfile(session.user.id);
    setProfile(p);
  }, [session, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      if (s?.user) {
        Promise.all([fetchProfile(s.user.id), fetchAccess(s.user.id)]).then(([p, a]) => {
          if (mounted) {
            setProfile(p);
            setRoles(a.roles);
            setPermissions(a.permissions);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        if (newSession?.user) {
          (async () => {
            const [p, a] = await Promise.all([
              fetchProfile(newSession.user.id),
              fetchAccess(newSession.user.id),
            ]);
            if (mounted) {
              setProfile(p);
              setRoles(a.roles);
              setPermissions(a.permissions);
            }
          })();
        } else {
          setProfile(null);
          setRoles([]);
          setPermissions([]);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [fetchProfile, fetchAccess]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setRoles([]);
    setPermissions([]);
  }, []);

  const refreshAccess = useCallback(async () => {
    if (!session?.user) return;
    const a = await fetchAccess(session.user.id);
    setRoles(a.roles);
    setPermissions(a.permissions);
  }, [session, fetchAccess]);

  const hasPermission = useCallback((perm: string) => permissions.includes(perm), [permissions]);
  const hasAnyPermission = useCallback((perms: string[]) => perms.some((x) => permissions.includes(x)), [permissions]);
  const hasRole = useCallback((role: AppRole) => roles.includes(role), [roles]);

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email ?? '',
        role: highestRole(roles),
        profile,
      }
    : null;

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
    roles,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasRole,
    refreshAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

/** Roles of the signed-in user, loaded from the database. */
export function useRoles() {
  const { roles, hasRole, loading } = useAuth();
  return { roles, hasRole, loading };
}

/** Permissions of the signed-in user, loaded from the database. */
export function usePermissions() {
  const { permissions, hasPermission, hasAnyPermission, loading } = useAuth();
  return { permissions, hasPermission, hasAnyPermission, loading };
}
