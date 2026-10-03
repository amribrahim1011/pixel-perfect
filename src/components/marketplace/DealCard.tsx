import { Link } from './Link';
import { Badge, Button } from '@/components/ak-ui';
import { Flame, Clock } from 'lucide-react';

export interface DealCardProps {
  title: string;
  description: string;
  category: string;
  originalPrice?: string;
  dealPrice?: string;
  endsIn?: string;
  imageUrl?: string;
}

export function DealCard({
  title,
  description,
  category,
  originalPrice,
  dealPrice,
  endsIn,
  imageUrl,
}: DealCardProps) {
  return (
    <Link to="/deals" className="card-surface card-surface-hover group block overflow-hidden">
      <div className="relative h-40 overflow-hidden bg-base-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-900/30 via-base-850 to-base-900">
            <Flame size={48} className="text-gold-600/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-850 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="danger" icon={<Flame size={12} />}>
            Hot Deal
          </Badge>
        </div>
        {endsIn && (
          <div className="absolute top-3 right-3">
            <Badge variant="neutral" icon={<Clock size={12} />}>
              {endsIn}
            </Badge>
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-gold-400">
          {category}
        </span>
        <h3 className="font-display text-lg text-ink-50 group-hover:text-gold-200 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-ink-400 line-clamp-2">{description}</p>
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            {dealPrice && (
              <span className="font-display text-xl text-gold-300">{dealPrice}</span>
            )}
            {originalPrice && (
              <span className="text-sm text-ink-500 line-through">{originalPrice}</span>
            )}
          </div>
          <Button size="sm" variant="outline">
            View Deal
          </Button>
        </div>
      </div>
    </Link>
  );
}
