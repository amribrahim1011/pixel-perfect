-- ===== TABLES =====
CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  is_system_role boolean NOT NULL DEFAULT false,
  rank integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  module text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.role_permissions (
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
  assigned_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role_id)
);
CREATE INDEX idx_permissions_module ON public.permissions(module);
CREATE INDEX idx_role_permissions_permission ON public.role_permissions(permission_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.roles, public.permissions, public.role_permissions, public.user_roles TO authenticated;
GRANT ALL ON public.roles, public.permissions, public.role_permissions, public.user_roles TO service_role;

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== HELPER FUNCTIONS (security definer => no RLS recursion) =====
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = _user_id
      AND (r.slug = 'owner' OR EXISTS (
        SELECT 1 FROM public.role_permissions rp
        JOIN public.permissions p ON p.id = rp.permission_id
        WHERE rp.role_id = ur.role_id AND p.slug = _permission))
  )
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role_slug text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
                 WHERE ur.user_id = _user_id AND r.slug = _role_slug)
$$;

CREATE OR REPLACE FUNCTION public.get_my_permissions()
RETURNS SETOF text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT DISTINCT p.slug FROM public.permissions p
  WHERE EXISTS (
    SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
      AND (r.slug = 'owner' OR EXISTS (SELECT 1 FROM public.role_permissions rp WHERE rp.role_id = ur.role_id AND rp.permission_id = p.id)))
$$;

REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_my_permissions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text), public.has_role(uuid, text), public.get_my_permissions() TO authenticated;

-- ===== RLS POLICIES =====
CREATE POLICY "roles_read" ON public.roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "roles_create" ON public.roles FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'roles.create') AND is_system_role = false);
CREATE POLICY "roles_edit" ON public.roles FOR UPDATE TO authenticated USING (public.has_permission(auth.uid(), 'roles.edit')) WITH CHECK (public.has_permission(auth.uid(), 'roles.edit'));
CREATE POLICY "roles_delete" ON public.roles FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'roles.delete') AND is_system_role = false);

CREATE POLICY "permissions_read" ON public.permissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "role_permissions_read" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "role_permissions_insert" ON public.role_permissions FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'roles.manage_permissions'));
CREATE POLICY "role_permissions_delete" ON public.role_permissions FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'roles.manage_permissions'));

CREATE POLICY "user_roles_read_own" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_permission(auth.uid(), 'users.view'));
CREATE POLICY "user_roles_insert" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_permission(auth.uid(), 'users.manage_roles'));
CREATE POLICY "user_roles_delete" ON public.user_roles FOR DELETE TO authenticated USING (public.has_permission(auth.uid(), 'users.manage_roles'));

-- Admins with users.view can read all profiles
CREATE POLICY "profiles_select_admin" ON public.profiles FOR SELECT TO authenticated USING (public.has_permission(auth.uid(), 'users.view'));

-- ===== ROLE-ASSIGNMENT GUARDS =====
CREATE OR REPLACE FUNCTION public.guard_user_roles()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _caller uuid := auth.uid();
  _row public.user_roles := COALESCE(NEW, OLD);
  _role_slug text; _role_rank int; _caller_rank int;
BEGIN
  SELECT slug, rank INTO _role_slug, _role_rank FROM public.roles WHERE id = _row.role_id;

  IF TG_OP = 'UPDATE' THEN
    RAISE EXCEPTION 'Role assignments cannot be edited; remove and re-add instead';
  END IF;

  -- Last-owner protection applies to everyone, including backend jobs
  IF TG_OP = 'DELETE' AND _role_slug = 'owner' THEN
    IF (SELECT count(*) FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id WHERE r.slug = 'owner') <= 1 THEN
      RAISE EXCEPTION 'Cannot remove the last Owner';
    END IF;
  END IF;

  -- Checks below apply to signed-in callers (backend/system jobs have no auth.uid())
  IF _caller IS NOT NULL THEN
    SELECT COALESCE(max(r.rank), 0) INTO _caller_rank FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id WHERE ur.user_id = _caller;

    IF _row.user_id = _caller AND _caller_rank < 100 THEN
      RAISE EXCEPTION 'You cannot change your own roles';
    END IF;
    IF _role_slug = 'owner' AND _caller_rank < 100 THEN
      RAISE EXCEPTION 'Only an Owner can grant or remove the Owner role';
    END IF;
    IF _role_rank >= _caller_rank AND _caller_rank < 100 THEN
      RAISE EXCEPTION 'You can only manage roles below your own';
    END IF;
    IF TG_OP = 'INSERT' THEN NEW.assigned_by := _caller; END IF;
  END IF;

  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER user_roles_guard BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION public.guard_user_roles();

CREATE OR REPLACE FUNCTION public.guard_roles()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.is_system_role THEN RAISE EXCEPTION 'System roles cannot be deleted'; END IF;
    RETURN OLD;
  END IF;
  IF OLD.is_system_role AND (NEW.slug <> OLD.slug OR NEW.is_system_role <> OLD.is_system_role OR NEW.rank <> OLD.rank) THEN
    RAISE EXCEPTION 'System role identity cannot be changed';
  END IF;
  IF NOT OLD.is_system_role AND NEW.rank >= 100 THEN
    RAISE EXCEPTION 'Custom roles cannot outrank Co-Owner';
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER roles_guard BEFORE UPDATE OR DELETE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.guard_roles();

CREATE OR REPLACE FUNCTION public.guard_role_permissions()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _r public.role_permissions := COALESCE(NEW, OLD); _rank int; _caller_rank int;
BEGIN
  IF auth.uid() IS NOT NULL THEN
    SELECT rank INTO _rank FROM public.roles WHERE id = _r.role_id;
    SELECT COALESCE(max(r.rank), 0) INTO _caller_rank FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id WHERE ur.user_id = auth.uid();
    IF _rank >= _caller_rank AND _caller_rank < 100 THEN
      RAISE EXCEPTION 'You can only change permissions of roles below your own';
    END IF;
  END IF;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER role_permissions_guard BEFORE INSERT OR DELETE ON public.role_permissions FOR EACH ROW EXECUTE FUNCTION public.guard_role_permissions();

-- ===== NEW USERS: profile + default role; very first user becomes Owner =====
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, split_part(NEW.email, '@', 1));
  INSERT INTO public.user_roles (user_id, role_id) SELECT NEW.id, id FROM public.roles WHERE slug = 'user';
  IF NOT EXISTS (SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id WHERE r.slug = 'owner') THEN
    INSERT INTO public.user_roles (user_id, role_id) SELECT NEW.id, id FROM public.roles WHERE slug = 'owner';
  END IF;
  RETURN NEW;
END; $$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user(), public.guard_user_roles(), public.guard_roles(), public.guard_role_permissions() FROM PUBLIC, anon, authenticated;

-- ===== SEED: roles =====
INSERT INTO public.roles (name, slug, description, is_system_role, rank) VALUES
 ('User','user','Normal customer access',true,10),
 ('Booster','booster','Customer access plus booster tools',true,20),
 ('Trusted Booster','trusted_booster','Booster plus trusted-booster capabilities',true,30),
 ('Admin','admin','Day-to-day store administration',true,50),
 ('Co-Owner','co_owner','Senior administration including withdrawals',true,90),
 ('Owner','owner','Full access to everything',true,100);

-- ===== SEED: permissions =====
INSERT INTO public.permissions (slug, name, module) VALUES
 ('users.view','View users','users'),('users.edit','Edit users','users'),('users.manage_roles','Manage user roles','users'),
 ('games.view','View games','games'),('games.create','Create games','games'),('games.edit','Edit games','games'),('games.delete','Delete games','games'),
 ('categories.view','View categories','categories'),('categories.create','Create categories','categories'),('categories.edit','Edit categories','categories'),('categories.delete','Delete categories','categories'),
 ('services.view','View services','services'),('services.create','Create services','services'),('services.edit','Edit services','services'),('services.delete','Delete services','services'),('services.manage_pricing','Manage service pricing','services'),
 ('orders.view','View orders','orders'),('orders.create','Create orders','orders'),('orders.edit','Edit orders','orders'),('orders.assign','Assign orders','orders'),('orders.change_status','Change order status','orders'),('orders.cancel','Cancel orders','orders'),('orders.refund','Refund orders','orders'),
 ('payments.view','View payments','payments'),('payments.verify','Verify payments','payments'),('payments.reject','Reject payments','payments'),
 ('boosters.view','View boosters','boosters'),('boosters.manage','Manage boosters','boosters'),('boosters.approve_applications','Approve booster applications','boosters'),('boosters.promote','Promote boosters','boosters'),('boosters.demote','Demote boosters','boosters'),
 ('withdrawals.view','View withdrawals','withdrawals'),('withdrawals.review','Review withdrawals','withdrawals'),('withdrawals.approve','Approve withdrawals','withdrawals'),('withdrawals.reject','Reject withdrawals','withdrawals'),('withdrawals.mark_paid','Mark withdrawals paid','withdrawals'),
 ('reviews.view','View reviews','reviews'),('reviews.moderate','Moderate reviews','reviews'),
 ('deals.view','View deals','deals'),('deals.manage','Manage deals','deals'),
 ('coupons.view','View coupons','coupons'),('coupons.manage','Manage coupons','coupons'),
 ('support.view','View support tickets','support'),('support.manage','Manage support tickets','support'),
 ('notifications.manage','Manage notifications','notifications'),
 ('settings.view','View settings','settings'),('settings.manage','Manage settings','settings'),
 ('roles.view','View roles','roles'),('roles.create','Create roles','roles'),('roles.edit','Edit roles','roles'),('roles.delete','Delete roles','roles'),('roles.manage_permissions','Manage role permissions','roles'),
 ('dashboard.access','Access customer dashboard','dashboard'),('booster_panel.access','Access booster panel','booster'),('admin_panel.access','Access admin panel','admin'),
 ('booster.trusted_orders','Take trusted-only orders','booster');

-- ===== SEED: default role permissions =====
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM public.roles r JOIN public.permissions p ON (
  (r.slug = 'user' AND p.slug IN ('dashboard.access','games.view','services.view','deals.view','orders.create','reviews.view'))
  OR (r.slug = 'booster' AND p.slug IN ('dashboard.access','booster_panel.access','games.view','services.view','deals.view','orders.create','reviews.view'))
  OR (r.slug = 'trusted_booster' AND p.slug IN ('dashboard.access','booster_panel.access','booster.trusted_orders','games.view','services.view','deals.view','orders.create','reviews.view'))
  OR (r.slug = 'admin' AND (p.slug IN ('dashboard.access','admin_panel.access','users.view','users.edit','users.manage_roles','roles.view','settings.view','withdrawals.view','boosters.approve_applications')
       OR p.module IN ('games','categories','services','orders','payments','reviews','deals','coupons','support','notifications')
          AND p.slug NOT IN ('orders.refund','services.manage_pricing')
       OR p.slug IN ('boosters.view','boosters.manage')))
  OR (r.slug = 'co_owner' AND p.slug NOT IN ('roles.create','roles.delete','settings.manage'))
);