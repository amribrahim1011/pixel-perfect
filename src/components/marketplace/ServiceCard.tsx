import { Link } from './Link';
import { Badge } from '@/components/ak-ui/Badge';
import { Clock, Star } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  game: string;
  deliveryTime?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  badge?: string;
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
  badge,
}: ServiceCardProps) {
  return (
    <Link
      to="/services"
      className="card-surface card-surface-hover group block overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden bg-base-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal-gradient">
            <span className="font-display text-2xl text-base-600 uppercase tracking-widest">
              {game}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-850 via-transparent to-transparent" />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-gold-400">
            {category}
          </span>
          {rating !== undefined && (
            <div className="flex items-center gap-1 text-sm text-ink-300">
              <Star size={14} className="fill-gold-400 text-gold-400" />
              <span>{rating.toFixed(1)}</span>
              {reviewCount !== undefined && (
                <span className="text-ink-500">({reviewCount})</span>
              )}
            </div>
          )}
        </div>
        <h3 className="font-display text-lg text-ink-50 group-hover:text-gold-200 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-ink-400 line-clamp-2">{description}</p>
        {deliveryTime && (
          <div className="flex items-center gap-1.5 text-sm text-ink-300">
            <Clock size={14} />
            <span>{deliveryTime}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
