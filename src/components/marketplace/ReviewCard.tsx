import { Card } from '@/components/ak-ui/Card';
import { Star } from 'lucide-react';

export interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  service?: string;
}

export function ReviewCard({ author, rating, date, title, body, service }: ReviewCardProps) {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 border border-gold-600/30 font-display text-gold-300">
            {author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-ink-100">{author}</p>
            <p className="text-xs text-ink-400">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'fill-gold-400 text-gold-400' : 'text-base-600'}
            />
          ))}
        </div>
      </div>
      <h4 className="font-display text-base text-gold-200">{title}</h4>
      <p className="text-sm text-ink-300 leading-relaxed">{body}</p>
      {service && (
        <p className="text-xs text-ink-500 border-t border-base-700 pt-2">
          Service: <span className="text-ink-300">{service}</span>
        </p>
      )}
    </Card>
  );
}
