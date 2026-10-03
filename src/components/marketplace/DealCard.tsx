import { Link } from './Link';
import { Badge, Button } from '@/components/ak-ui';
import { Flame, Clock } from 'lucide-react';

export interface DealCardProps {
  title: string;
  description: string;
  category: string;
  originalPrice?: string;
  dealPrice?: string;
  /** Optional explicit discount; otherwise computed from the two prices. */
  discountPercent?: number;
  endsIn?: string;
  imageUrl?: string;
  to?: string;
  ctaLabel?: string;
}

function toNumber(v?: string) {
  if (!v) return undefined;
  const n = parseFloat(v.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : undefined;
}

export function DealCard({
  title,
  description,
  category,
  originalPrice,
  dealPrice,
  discountPercent,
  endsIn,
  imageUrl,
  to = '/deals',
  ctaLabel = 'View Deal',
}: DealCardProps) {
  const o = toNumber(originalPrice);
  const d = toNumber(dealPrice);
  const pct = discountPercent ?? (o && d && o > d ? Math.round(((o - d) / o) * 100) : undefined);

  return (
    <Link to={to} className="card-surface card-surface-hover group flex flex-col overflow-hidden">
      <div className="relative h-44 overflow-hidden bg-base-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-900/30 via-base-850 to-base-900">
            <Flame size={48} className="text-gold-600/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-850 via-base-850/20 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {pct !== undefined && (
            <span className="rounded-md bg-gold-gradient px-2 py-1 text-xs font-bold text-base-950">-{pct}%</span>
          )}
        </div>
        {endsIn && (
          <div className="absolute top-3 right-3">
            <Badge variant="neutral" icon={<Clock size={12} />}>
              {endsIn}
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-gold-400">{category}</span>
        <h3 className="font-display text-lg text-ink-50 transition-colors group-hover:text-gold-200">{title}</h3>
        <p className="line-clamp-2 text-sm text-ink-400">{description}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-2">
            {dealPrice && <span className="font-display text-xl text-gold-300">{dealPrice}</span>}
            {originalPrice && <span className="text-sm text-ink-500 line-through">{originalPrice}</span>}
          </div>
          <Button size="sm" variant="outline" tabIndex={-1}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Link>
  );
}
