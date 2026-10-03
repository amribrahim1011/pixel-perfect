/*
# Role Audit Log and Admin Users Email Access

## Purpose
Phase 2C — Role Management UI support. Adds an append-only audit trail
for every role assignment/removal and a secure function to expose user
emails to authorized admins (the browser cannot read auth.users directly).

## New Tables
### role_audit_log
Append-only audit trail for every role change.
- id (uuid PK)
- target_user_id (uuid NOT NULL, references auth.users ON DELETE CASCADE)
- role_id (uuid, nullable, references roles ON DELETE SET NULL)
- role_slug (text NOT NULL) — preserved even if the role is later deleted
- role_name (text NOT NULL) — preserved for historical readability
- action (text NOT NULL, CHECK: 'assigned' or 'removed')
- changed_by (uuid, nullable, references auth.users ON DELETE SET NULL)
- changed_by_name (text, nullable) — admin display name at time of change
- created_at (timestamptz DEFAULT now())

## New Functions
### get_admin_users()
SECURITY DEFINER STABLE. Returns all profiles joined with auth.users email.
Returns an empty set if the caller lacks the users.view permission.
### log_role_change()
SECURITY DEFINER trigger function. Fires AFTER INSERT or DELETE on
user_roles and inserts a row into role_audit_log automatically.

## New Triggers
### user_roles_audit
AFTER INSERT OR DELETE on user_roles → log_role_change()

## RLS Policies
### role_audit_log
- SELECT: authenticated users with users.view permission only
- No INSERT/UPDATE/DELETE policies — populated exclusively by the trigger

## Security Notes
1. All existing RLS, triggers, roles, permissions, and guard functions
   remain completely unchanged.
2. The audit trigger fires AFTER the existing guard_user_roles BEFORE
   trigger, so rejected role changes are NOT logged.
3. Only users with users.view can read audit records.
4. Emails are only exposed through get_admin_users() which checks
   users.view internally — never directly from auth.users.
5. All new functions are revoked from PUBLIC and anon.
*/

-- ===== TABLE =====
CREATE TABLE IF NOT EXISTS public.role_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
  role_slug text NOT NULL,
  role_name text NOT NULL,
  action text NOT NULL CHECK (action IN ('assigned', 'removed')),
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_by_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_role_audit_target ON public.role_audit_log(target_user_id);
CREATE INDEX IF NOT EXISTS idx_role_audit_created ON public.role_audit_log(created_at DESC);

GRANT SELECT ON public.role_audit_log TO authenticated;
GRANT ALL ON public.role_audit_log TO service_role;

ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "role_audit_log_read" ON public.role_audit_log;
CREATE POLICY "role_audit_log_read"
  ON public.role_audit_log FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'users.view'));

-- ===== FUNCTIONS =====
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
  id uuid,
  username text,
  display_name text,
  email text,
  avatar_url text,
  phone text,
  country text,
  status text,
  created_at timestamptz
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.username, p.display_name, u.email, p.avatar_url,
         p.phone, p.country, p.status, p.created_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE public.has_permission(auth.uid(), 'users.view')
  ORDER BY p.created_at DESC
$$;

CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _role_slug text;
  _role_name text;
  _caller uuid := auth.uid();
  _caller_name text;
  _target uuid;
  _role_id uuid;
BEGIN
  _target := COALESCE(NEW.user_id, OLD.user_id);
  _role_id := COALESCE(NEW.role_id, OLD.role_id);

  SELECT slug, name INTO _role_slug, _role_name FROM public.roles WHERE id = _role_id;
  SELECT display_name INTO _caller_name FROM public.profiles WHERE id = _caller;

  INSERT INTO public.role_audit_log
    (target_user_id, role_id, role_slug, role_name, action, changed_by, changed_by_name)
  VALUES
    (_target, _role_id, _role_slug, _role_name,
     CASE WHEN TG_OP = 'INSERT' THEN 'assigned' ELSE 'removed' END,
     _caller, _caller_name);

  RETURN NULL;
END;
$$;

-- ===== TRIGGER =====
DROP TRIGGER IF EXISTS user_roles_audit ON public.user_roles;
CREATE TRIGGER user_roles_audit
  AFTER INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_change();

-- ===== REVOKE / GRANT =====
REVOKE EXECUTE ON FUNCTION public.get_admin_users() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.log_role_change() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;