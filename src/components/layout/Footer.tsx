import { Link } from '@/lib/router-compat';
import { brand } from '@/lib/brand';

// Links pointing to pages that don't exist yet go to the closest existing page.
const columns: { title: string; links: { label: string; to: string }[] }[] = [
  { title: brand.name, links: [
    { label: 'About', to: '/how-it-works' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Become a Booster', to: '/become-a-booster' },
  ] },
  { title: 'Services', links: [
    { label: 'Power Leveling', to: '/services' },
    { label: 'Mythic+', to: '/services' },
    { label: 'Raids', to: '/services' },
    { label: 'Delves', to: '/services' },
    { label: 'Mounts', to: '/services' },
  ] },
  { title: 'Support', links: [
    { label: 'Support', to: '/support' },
    { label: 'Contact', to: '/support' },
    { label: 'FAQ', to: '/support' },
  ] },
  { title: 'Legal', links: [
    { label: 'Terms', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Refund Policy', to: '/refund-policy' },
  ] },
];

export function Footer() {
  return (
    <footer className="border-t border-base-800 bg-base-950">
      <div className="container-ak py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient font-display font-bold text-base-950">{brand.shortName}</span>
              <span className="font-display text-lg font-bold tracking-wider text-ink-50">{brand.name.toUpperCase()}</span>
            </div>
            <p className="max-w-xs text-sm text-ink-400">{brand.description}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm tracking-wider text-ink-100">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}><Link to={l.to} className="link-quiet text-sm">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-hairline mt-12" />
        <p className="pt-6 text-center text-sm text-ink-500">© {brand.copyrightYear} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
