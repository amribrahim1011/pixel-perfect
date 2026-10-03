<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Imported AK Team pages use `@/lib/router-compat` (react-router-style API over TanStack Router) — lets the ported pages keep their original link/navigate code.
- Imported UI kit lives in `src/components/ak-ui` — avoids clashing with the shadcn files in `src/components/ui`.
- Each route file wraps its page in the matching layout (Public/Dashboard/Booster/Admin); signed-in areas use `ProtectedRoute` with `ssr: false` — the session lives in the browser, so the server can't check it.
- Avatars bucket is private; profile photos use long-lived signed links — the workspace blocks public buckets.
- Authorization comes from database roles/permissions (`has_permission` SQL function + `useAuth().hasPermission`); pages are gated with `ProtectedRoute anyPermission` — never check role names or emails in code, so access rules can change without code edits.
- Role safety rules (last Owner, rank limits, no self-changes) live in database triggers — the frontend can be bypassed, the database can't.
