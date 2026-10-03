import { Fragment, useEffect, useState } from 'react';
import { Check, Minus, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ak-ui';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Role { id: string; name: string; slug: string; rank: number; is_system_role: boolean }
interface Permission { id: string; slug: string; name: string; module: string }
interface RolePermission { role_id: string; permission_id: string }

export function AdminRolesPermissions() {
  const { roles: myRoles, permissions: myPerms } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [perms, setPerms] = useState<Permission[]>([]);
  const [links, setLinks] = useState<RolePermission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [r, p, rp] = await Promise.all([
        supabase.from('roles').select('id,name,slug,rank,is_system_role').order('rank'),
        supabase.from('permissions').select('id,slug,name,module').order('module').order('slug'),
        supabase.from('role_permissions').select('role_id,permission_id'),
      ]);
      const err = r.error ?? p.error ?? rp.error;
      if (err) { setError(err.message); return; }
      setRoles(r.data ?? []);
      setPerms(p.data ?? []);
      setLinks(rp.data ?? []);
    })();
  }, []);

  const has = (role: Role, perm: Permission) =>
    role.slug === 'owner' || links.some((l) => l.role_id === role.id && l.permission_id === perm.id);

  const modules = Array.from(new Set(perms.map((p) => p.module)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Live access rules from the database. Owner always has every permission."
        breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Roles & Permissions' }]}
      />

      <div className="card-surface p-5 flex flex-wrap items-center gap-3">
        <ShieldCheck className="text-gold-400" size={20} />
        <span className="text-ink-200">Your roles:</span>
        {myRoles.map((r) => (
          <span key={r} className="rounded-full border border-gold-700/50 bg-gold-gradient-soft px-3 py-0.5 text-sm text-gold-200">{r}</span>
        ))}
        <span className="text-ink-400 text-sm">· {myPerms.length} permissions</span>
      </div>

      {error && <div className="card-surface p-4 text-danger-400">{error}</div>}

      <div className="card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-base-700">
              <th className="px-4 py-3 text-left font-medium text-ink-300">Permission</th>
              {roles.map((r) => (
                <th key={r.id} className="px-3 py-3 text-center font-medium text-ink-200 whitespace-nowrap">{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <Fragment key={m}>
                <tr className="bg-base-800/60">
                  <td colSpan={roles.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-400">{m}</td>
                </tr>
                {perms.filter((p) => p.module === m).map((p) => (
                  <tr key={p.id} className="border-b border-base-700/60">
                    <td className="px-4 py-2">
                      <div className="text-ink-100">{p.name}</div>
                      <div className="text-xs text-ink-400">{p.slug}</div>
                    </td>
                    {roles.map((r) => (
                      <td key={r.id} className="px-3 py-2 text-center">
                        {has(r, p) ? <Check size={16} className="inline text-success-400" /> : <Minus size={16} className="inline text-ink-500" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
