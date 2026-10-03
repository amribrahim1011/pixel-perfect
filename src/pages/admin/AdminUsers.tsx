import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Shield, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Input } from '@/components/ak-ui';
import { RoleManagementModal } from '@/components/admin/RoleManagementModal';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { AppRole } from '@/types/auth';

interface AdminUserRow {
  id: string;
  username: string | null;
  display_name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  country: string | null;
  status: string;
  created_at: string;
}

interface UserRoleLink {
  role_id: string;
  roles: { slug: string; name: string; rank: number } | null;
}

const ROLE_BADGE_VARIANT: Record<string, 'gold' | 'warning' | 'success' | 'neutral' | 'danger'> = {
  owner: 'gold',
  co_owner: 'warning',
  admin: 'success',
  trusted_booster: 'neutral',
  booster: 'neutral',
  user: 'neutral',
};

const ROLE_ORDER: AppRole[] = ['owner', 'co_owner', 'admin', 'trusted_booster', 'booster', 'user'];

function sortRoleSlugs(slugs: string[]): string[] {
  return [...new Set(slugs)].sort((a, b) => {
    const ia = ROLE_ORDER.indexOf(a as AppRole);
    const ib = ROLE_ORDER.indexOf(b as AppRole);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

const PAGE_SIZE = 12;

export function AdminUsers() {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [userRolesMap, setUserRolesMap] = useState<Record<string, UserRoleLink[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [modalUser, setModalUser] = useState<AdminUserRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesVersion, setRolesVersion] = useState(0);

  const canManageRoles = hasPermission('users.manage_roles');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data: adminUsers, error: fnError } = await supabase.rpc('get_admin_users');
    if (fnError) {
      setError(fnError.message);
      setLoading(false);
      return;
    }

    const rows = (adminUsers ?? []) as unknown as AdminUserRow[];
    setUsers(rows);

    if (rows.length > 0) {
      const { data: roleLinks, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id,role_id,roles(slug,name,rank)')
        .in(
          'user_id',
          rows.map((r) => r.id),
        );

      if (rolesError) {
        setError(rolesError.message);
      } else {
        const map: Record<string, UserRoleLink[]> = {};
        for (const link of (roleLinks ?? []) as unknown as {
          user_id: string;
          role_id: string;
          roles: { slug: string; name: string; rank: number } | null;
        }[]) {
          const arr = map[link.user_id] ?? (map[link.user_id] = []);
          arr.push({ role_id: link.role_id, roles: link.roles });
        }
        setUserRolesMap(map);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, rolesVersion]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.display_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.username ?? '').toLowerCase().includes(q),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageUsers = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleManageRoles = (user: AdminUserRow) => {
    setModalUser(user);
    setModalOpen(true);
  };

  const handleRolesChanged = () => {
    setRolesVersion((v) => v + 1);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        subtitle="Manage user accounts and roles."
        breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Users' }]}
      />

      {error && (
        <div className="card-surface p-4 text-danger-400 text-sm">
          {error}
        </div>
      )}

      {/* Search + stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, username…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="input-base pl-10"
          />
        </div>
        <div className="text-sm text-ink-400">
          {filtered.length} {filtered.length === 1 ? 'user' : 'users'}
        </div>
      </div>

      {/* User table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-gold-400" size={28} />
          </div>
        ) : pageUsers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-ink-400">No users found.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-base-700">
                    <th className="px-4 py-3 text-left font-medium text-ink-300">User</th>
                    <th className="px-4 py-3 text-left font-medium text-ink-300">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-ink-300">Roles</th>
                    <th className="px-4 py-3 text-left font-medium text-ink-300">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-ink-300">Joined</th>
                    <th className="px-4 py-3 text-right font-medium text-ink-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageUsers.map((u) => {
                    const roleLinks = userRolesMap[u.id] ?? [];
                    const slugs = roleLinks
                      .map((r) => r.roles?.slug)
                      .filter((s): s is string => !!s);
                    const sortedSlugs = sortRoleSlugs(slugs);

                    return (
                      <tr
                        key={u.id}
                        className="border-b border-base-700/60 transition-colors hover:bg-base-800/40"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-800 border border-base-700 text-gold-400">
                              <Shield size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-ink-100 truncate">{u.display_name}</div>
                              {u.username && (
                                <div className="text-xs text-ink-400 truncate">@{u.username}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ink-300 truncate max-w-[200px]">{u.email}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {sortedSlugs.length === 0 ? (
                              <span className="text-xs text-ink-500">None</span>
                            ) : (
                              sortedSlugs.map((slug) => {
                                const link = roleLinks.find((r) => r.roles?.slug === slug);
                                return (
                                  <Badge
                                    key={slug}
                                    variant={ROLE_BADGE_VARIANT[slug] ?? 'neutral'}
                                  >
                                    {link?.roles?.name ?? slug}
                                  </Badge>
                                );
                              })
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={u.status === 'active' ? 'success' : 'danger'}>
                            {u.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-ink-400 whitespace-nowrap">
                          {formatDate(u.created_at)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Shield size={14} />}
                            onClick={() => handleManageRoles(u)}
                          >
                            Manage Roles
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-base-700">
              {pageUsers.map((u) => {
                const roleLinks = userRolesMap[u.id] ?? [];
                const slugs = roleLinks
                  .map((r) => r.roles?.slug)
                  .filter((s): s is string => !!s);
                const sortedSlugs = sortRoleSlugs(slugs);

                return (
                  <div key={u.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-800 border border-base-700 text-gold-400">
                          <Shield size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-ink-100 truncate">{u.display_name}</div>
                          <div className="text-xs text-ink-400 truncate">{u.email}</div>
                        </div>
                      </div>
                      <Badge variant={u.status === 'active' ? 'success' : 'danger'}>
                        {u.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sortedSlugs.length === 0 ? (
                        <span className="text-xs text-ink-500">No roles</span>
                      ) : (
                        sortedSlugs.map((slug) => {
                          const link = roleLinks.find((r) => r.roles?.slug === slug);
                          return (
                            <Badge key={slug} variant={ROLE_BADGE_VARIANT[slug] ?? 'neutral'}>
                              {link?.roles?.name ?? slug}
                            </Badge>
                          );
                        })
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ink-400">Joined {formatDate(u.created_at)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Shield size={14} />}
                        onClick={() => handleManageRoles(u)}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-base-700 px-4 py-3">
                <span className="text-xs text-ink-400">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={currentPage === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    leftIcon={<ChevronLeft size={16} />}
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    rightIcon={<ChevronRight size={16} />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {!canManageRoles && !loading && (
        <p className="text-center text-sm text-ink-400">
          You can view users but do not have permission to manage roles.
        </p>
      )}

      <RoleManagementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        targetUser={modalUser}
        onRolesChanged={handleRolesChanged}
      />
    </div>
  );
}
