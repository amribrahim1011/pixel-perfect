import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/database';

export type AppRole =
  | 'user'
  | 'booster'
  | 'trusted_booster'
  | 'admin'
  | 'co_owner'
  | 'owner';

export interface AuthUser {
  id: string;
  email: string;
  role: AppRole | null;
  profile: Profile | null;
}

export interface AuthContextValue {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  roles: AppRole[];
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasRole: (role: AppRole) => boolean;
  refreshAccess: () => Promise<void>;
}

export type SupabaseUser = User;
