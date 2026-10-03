import { Link } from '@/lib/router-compat';
import { brand } from '@/lib/brand';
import { footerNavItems } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="border-t border-base-700 bg-base-950">
      <div className="container-ak py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient font-display text-base-950 font-bold">
                {brand.shortName}
              </span>
              <span className="font-display text-lg font-bold tracking-wider text-ink-50">
                {brand.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-ink-400 max-w-xs">{brand.description}</p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {footerNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-ink-300 hover:text-gold-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-base-800 pt-6">
          <p className="text-center text-sm text-ink-500">
            © {brand.copyrightYear} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
