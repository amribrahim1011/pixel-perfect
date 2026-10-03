/**
 * Thin adapter exposing the react-router-dom-style API used by the imported
 * AK Team pages, backed by TanStack Router.
 */
import { forwardRef, useEffect } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import {
  Link as TsLink,
  Outlet,
  useNavigate as useTsNavigate,
  useLocation as useTsLocation,
  useParams as useTsParams,
} from '@tanstack/react-router';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  replace?: boolean;
  state?: Record<string, unknown>;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state, ...rest },
  ref,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyLink = TsLink as any;
  return <AnyLink ref={ref} to={to} replace={replace} state={state} {...rest} />;
});

export function useNavigate() {
  const navigate = useTsNavigate();
  return (to: string, opts?: { replace?: boolean | undefined; state?: Record<string, unknown> | undefined }) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to, replace: opts?.replace, state: opts?.state } as any);
}

export function useLocation() {
  const loc = useTsLocation();
  return { pathname: loc.pathname, search: loc.searchStr, hash: loc.hash, state: loc.state as unknown };
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return (useTsParams as any)({ strict: false }) as T;
}

export function Navigate({ to, replace, state }: { to: string; replace?: boolean; state?: Record<string, unknown> }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace, state });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return null;
}

export { Outlet };
