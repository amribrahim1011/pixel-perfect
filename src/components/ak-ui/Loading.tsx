import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export function LoadingSpinner({ size = 24, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn('animate-spin text-gold-400', className)} />;
}

export function LoadingOverlay({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <LoadingSpinner size={32} />
      <p className="text-ink-300 text-sm">{label}</p>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card-surface p-6 space-y-4">
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      <div className="flex gap-3">
        <div className="skeleton h-10 flex-1" />
        <div className="skeleton h-10 flex-1" />
      </div>
    </div>
  );
}
