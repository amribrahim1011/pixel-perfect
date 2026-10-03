import type { ReactNode } from 'react';
import { Link } from './Link';
import { Badge } from '@/components/ak-ui/Badge';
import { ArrowRight, Clock, Star } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  category?: string;
  game?: string;
  deliveryTime?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  icon?: ReactNode;
  badge?: string;
  /** Display-only price label, e.g. "$9.99". Real pricing comes later. */
  startingPrice?: string;
  to?: string;
  ctaLabel?: string;
}

export function ServiceCard({
  title,
  description,
  category,
  game,
  deliveryTime,
  rating,
  reviewCount,
  imageUrl,
  icon,
  badge,
  startingPrice,
  to = '/services',
  ctaLabel = 'View Service',
}: ServiceCardProps) {
  return (
    <Link to={to} className="card-surface card-surface-hover group flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden bg-base-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal-gradient bg-hero-radial">
            {icon ? (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-700/40 bg-gold-500/10 text-gold-300 transition-transform duration-500 group-hover:scale-110">
                {icon}
              </span>
            ) : (
              <span className="font-display text-2xl uppercase tracking-widest text-base-600">{game}</span>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-850 via-transparent to-transparent" />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {(category || rating !== undefined) && (
          <div className="flex items-center justify-between">
            {category && (
              <span className="text-xs font-medium uppercase tracking-wider text-gold-400">{category}</span>
            )}
            {rating !== undefined && (
              <div className="flex items-center gap-1 text-sm text-ink-300">
                <Star size={14} className="fill-gold-400 text-gold-400" />
                <span>{rating.toFixed(1)}</span>
                {reviewCount !== undefined && <span className="text-ink-500">({reviewCount})</span>}
              </div>
            )}
          </div>
        )}
        <h3 className="font-display text-lg text-ink-50 transition-colors group-hover:text-gold-200">{title}</h3>
        <p className="line-clamp-2 text-sm text-ink-400">{description}</p>
        {deliveryTime && (
          <div className="flex items-center gap-1.5 text-sm text-ink-300">
            <Clock size={14} />
            <span>{deliveryTime}</span>
          </div>
        )}
        <div className="mt-auto flex items-end justify-between border-t border-base-700 pt-4">
          {startingPrice ? (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-ink-500">Starting at</p>
              <p className="font-display text-lg text-gold-300">{startingPrice}</p>
            </div>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-200 transition-colors group-hover:text-gold-300">
            {ctaLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
