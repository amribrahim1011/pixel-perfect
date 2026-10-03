import { useCallback, useEffect, useState } from 'react';
import { Shield, ShieldPlus, ShieldX, AlertTriangle, Crown, Loader2 } from 'lucide-react';
import { Modal, Button, Badge } from '@/components/ak-ui';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { AppRole } from '@/types/auth';

interface RoleInfo {
  id: string;
  name: string;
  slug: string;
  rank: number;
  is_system_role: boolean;
  description: string | null;
}

interface UserRoleRow {
  id: string;
  role_id: string;
  roles: { slug: string; name: string; rank: number } | null;
}

interface AuditEntry {
  id: string;
  role_name: string;
  role_slug: string;
  action: string;
  changed_by_name: string | null;
  created_at: string;
}

interface RoleManagementModalProps {
  open: boolean;
  onClose: () => void;
  targetUser: {
    id: string;
    display_name: string;
    username: string | null;
    email: string;
    status: string;
    created_at: string;
  } | null;
  onRolesChanged?: () => void;
}

const ROLE_BADGE_VARIANT: Record<string, 'gold' | 'warning' | 'success' | 'neutral' | 'danger'> = {
  owner: 'gold',
  co_owner: 'warning',
  admin: 'success',
  trusted_booster: 'neutral',
  booster: 'neutral',
  user: 'neutral',
};

export function RoleManagementModal({
  open,
  onClose,
  targetUser,
  onRolesChanged,
}: RoleManagementModalProps) {
  const { user: currentUser, roles: myRoles, refreshAccess } = useAuth();
  const [allRoles, setAllRoles] = useState<RoleInfo[]>([]);
  const [userRoleRows, setUserRoleRows] = useState<UserRoleRow[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const [confirmAction, setConfirmAction] = useState<{
    type: 'assign' | 'remove';
    role: RoleInfo;
  } | null>(null);

  const myRank = (() => {
    const rankMap: Record<string, number> = {
      owner: 100, co_owner: 90, admin: 50, trusted_booster: 30, booster: 20, user: 10,
    };
    return Math.max(0, ...myRoles.map((r) => rankMap[r] ?? 0));
  })();

  const isOwner = myRoles.includes('owner');
  const isSelf = currentUser?.id === targetUser?.id;

  const loadData = useCallback(async () => {
    if (!targetUser) return;
    setLoading(true);
    const [rolesRes, userRolesRes, auditRes] = await Promise.all([
      supabase.from('roles').select('id,name,slug,rank,is_system_role,description').order('rank'),
      supabase
        .from('user_roles')
        .select('id,role_id,roles(slug,name,rank)')
        .eq('user_id', targetUser.id),
      supabase
        .from('role_audit_log')
        .select('id,role_name,role_slug,action,changed_by_name,created_at')
        .eq('target_user_id', targetUser.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    if (rolesRes.error) toast.error('Failed to load roles: ' + rolesRes.error.message);
    if (userRolesRes.error) toast.error('Failed to load user roles: ' + userRolesRes.error.message);
    if (auditRes.error) toast.error('Failed to load audit log: ' + auditRes.error.message);

    setAllRoles((rolesRes.data ?? []) as unknown as RoleInfo[]);
    setUserRoleRows((userRolesRes.data ?? []) as unknown as UserRoleRow[]);
    setAuditLog((auditRes.data ?? []) as unknown as AuditEntry[]);
    setLoading(false);
  }, [targetUser]);

  useEffect(() => {
    if (open && targetUser) loadData();
  }, [open, targetUser, loadData]);

  const targetRoleSlugs = userRoleRows
    .map((r) => r.roles?.slug)
    .filter((s): s is string => !!s);

  const targetMaxRank = Math.max(
    0,
    ...userRoleRows.map((r) => r.roles?.rank ?? 0),
  );

  const canManageRole = (role: RoleInfo): { allowed: boolean; reason?: string } => {
    if (isSelf && !isOwner) return { allowed: false, reason: 'You cannot change your own roles' };
    if (isSelf && isOwner) return { allowed: false, reason: 'You cannot change your own roles' };
    if (role.slug === 'owner' && !isOwner) return { allowed: false, reason: 'Only an Owner can grant or remove Owner' };
    if (role.rank >= myRank && !isOwner) return { allowed: false, reason: 'You can only manage roles below your own rank' };
    if (targetMaxRank >= myRank && !isOwner) return { allowed: false, reason: 'This user is at or above your rank' };
    return { allowed: true };
  };

  const handleAssign = async (role: RoleInfo) => {
    if (!targetUser) return;
    setActionLoading(true);
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: targetUser.id, role_id: role.id });

    setActionLoading(false);
    if (error) {
      toast.error(parseDbError(error.message));
      return;
    }
    toast.success(`${role.name} assigned to ${targetUser.display_name}`);
    setConfirmAction(null);
    await loadData();
    onRolesChanged?.();
    if (isSelf) await refreshAccess();
  };

  const handleRemove = async (role: RoleInfo) => {
    if (!targetUser) return;
    const row = userRoleRows.find((r) => r.roles?.slug === role.slug);
    if (!row) return;

    setActionLoading(true);
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', row.id);

    setActionLoading(false);
    if (error) {
      toast.error(parseDbError(error.message));
      return;
    }
    toast.success(`${role.name} removed from ${targetUser.display_name}`);
    setConfirmAction(null);
    await loadData();
    onRolesChanged?.();
    if (isSelf) await refreshAccess();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (!targetUser) return null;

  return (
    <Modal open={open} onClose={onClose} title="Manage Roles" size="lg">
      {/* User info header */}
      <div className="flex items-start gap-4 border-b border-base-700 pb-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-base-800 border border-base-700">
          <Shield className="text-gold-400" size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-ink-50 truncate">{targetUser.display_name}</h3>
          {targetUser.username && (
            <p className="text-sm text-ink-400 truncate">@{targetUser.username}</p>
          )}
          <p className="text-sm text-ink-300 truncate">{targetUser.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={targetUser.status === 'active' ? 'success' : 'danger'}>
              {targetUser.status}
            </Badge>
            <span className="text-xs text-ink-400">Joined {formatDate(targetUser.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Current roles */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-ink-200 mb-2">Current Roles</h4>
        {loading ? (
          <div className="flex items-center gap-2 text-ink-400 text-sm">
            <Loader2 className="animate-spin" size={16} /> Loading roles…
          </div>
        ) : targetRoleSlugs.length === 0 ? (
          <p className="text-sm text-ink-400">No roles assigned.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {userRoleRows.map((row) => {
              const slug = row.roles?.slug ?? 'unknown';
              const name = row.roles?.name ?? 'Unknown';
              const roleInfo = allRoles.find((r) => r.id === row.role_id);
              const canRemove = roleInfo ? canManageRole(roleInfo) : { allowed: false };
              return (
                <div key={row.id} className="group">
                  <Badge
                    variant={ROLE_BADGE_VARIANT[slug] ?? 'neutral'}
                    icon={slug === 'owner' ? <Crown size={12} /> : undefined}
                  >
                    {name}
                    {canRemove.allowed && (
                      <button
                        onClick={() => setConfirmAction({ type: 'remove', role: roleInfo! })}
                        disabled={actionLoading}
                        className="ml-1 text-current opacity-60 hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${name}`}
                      >
                        <ShieldX size={13} />
                      </button>
                    )}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available roles */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-ink-200 mb-2">Available Roles</h4>
        <div className="space-y-2">
          {allRoles.map((role) => {
            const hasRole = targetRoleSlugs.includes(role.slug);
            const canManage = canManageRole(role);
            const isHighestRole = role.slug === 'owner';

            return (
              <div
                key={role.id}
                className="flex items-center justify-between rounded-lg border border-base-700 bg-base-800/60 px-4 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                    isHighestRole ? 'bg-gold-500/15 text-gold-400' : 'bg-base-700 text-ink-300'
                  }`}>
                    {isHighestRole ? <Crown size={16} /> : <Shield size={16} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ink-100">{role.name}</span>
                      <span className="text-xs text-ink-500">rank {role.rank}</span>
                      {role.is_system_role && (
                        <span className="text-xs text-ink-500">system</span>
                      )}
                    </div>
                    {role.description && (
                      <p className="text-xs text-ink-400 truncate">{role.description}</p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 ml-3">
                  {hasRole ? (
                    <Badge variant="success">Assigned</Badge>
                  ) : canManage.allowed ? (
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<ShieldPlus size={14} />}
                      disabled={actionLoading}
                      onClick={() => setConfirmAction({ type: 'assign', role })}
                    >
                      Assign
                    </Button>
                  ) : (
                    <span className="text-xs text-ink-500" title={canManage.reason}>
                      {canManage.reason ?? 'Restricted'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit log toggle */}
      <div className="border-t border-base-700 pt-4">
        <button
          onClick={() => setShowAudit((v) => !v)}
          className="flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 transition-colors"
        >
          <Shield size={15} />
          {showAudit ? 'Hide' : 'Show'} role change history
        </button>
        {showAudit && (
          <div className="mt-3 space-y-2">
            {auditLog.length === 0 ? (
              <p className="text-sm text-ink-400">No role changes recorded.</p>
            ) : (
              auditLog.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-md bg-base-800/40 border border-base-700/60 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={entry.action === 'assigned' ? 'success' : 'danger'}>
                      {entry.action === 'assigned' ? 'Assigned' : 'Removed'}
                    </Badge>
                    <span className="text-ink-200">{entry.role_name}</span>
                  </div>
                  <span className="text-ink-400">
                    {entry.changed_by_name ?? 'System'} · {formatDateTime(entry.created_at)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Confirmation dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-base-950/90 backdrop-blur-sm"
            onClick={() => !actionLoading && setConfirmAction(null)}
          />
          <div className="relative z-10 w-full max-w-md card-surface animate-fade-in-scale p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning-500/15">
                <AlertTriangle className="text-warning-400" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base text-ink-50">Confirm Role Change</h4>
                <p className="mt-1 text-sm text-ink-300">
                  Are you sure you want to {confirmAction.type === 'assign' ? 'assign' : 'remove'}{' '}
                  <span className="text-gold-300 font-medium">{confirmAction.role.name}</span>{' '}
                  {confirmAction.type === 'assign' ? 'to' : 'from'}{' '}
                  <span className="text-ink-100 font-medium">{targetUser.display_name}</span>?
                </p>

                <div className="mt-3 rounded-lg border border-base-700 bg-base-800/60 p-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-ink-400">User</span>
                    <span className="text-ink-200">{targetUser.display_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Current roles</span>
                    <span className="text-ink-200">{targetRoleSlugs.join(', ') || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Action</span>
                    <span className="text-ink-200">
                      {confirmAction.type === 'assign' ? 'Assign' : 'Remove'} {confirmAction.role.name}
                    </span>
                  </div>
                  {(confirmAction.role.slug === 'owner' ||
                    confirmAction.role.slug === 'co_owner' ||
                    confirmAction.role.rank >= 50) && (
                    <div className="flex items-center gap-1.5 pt-1 text-warning-400">
                      <AlertTriangle size={12} />
                      This change affects administrative access.
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={actionLoading}
                    onClick={() => setConfirmAction(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={confirmAction.type === 'remove' ? 'danger' : 'primary'}
                    size="sm"
                    disabled={actionLoading}
                    leftIcon={actionLoading ? <Loader2 className="animate-spin" size={14} /> : undefined}
                    onClick={() =>
                      confirmAction.type === 'assign'
                        ? handleAssign(confirmAction.role)
                        : handleRemove(confirmAction.role)
                    }
                  >
                    {actionLoading
                      ? 'Processing…'
                      : confirmAction.type === 'assign'
                        ? 'Confirm Assign'
                        : 'Confirm Remove'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function parseDbError(message: string): string {
  if (message.includes('Cannot remove the last Owner')) return 'Cannot remove the last Owner';
  if (message.includes('Only an Owner can grant or remove the Owner role'))
    return 'Only an Owner can grant or remove the Owner role';
  if (message.includes('You cannot change your own roles'))
    return 'You cannot change your own roles';
  if (message.includes('You can only manage roles below your own'))
    return 'You can only manage roles below your own rank';
  if (message.includes('duplicate key')) return 'This user already has that role';
  return 'The database rejected this action. ' + message;
}

export type { AppRole };
