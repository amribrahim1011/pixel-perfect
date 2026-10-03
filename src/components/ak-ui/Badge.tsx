import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'gold' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  gold: 'bg-gold-500/15 text-gold-300 border-gold-600/40',
  success: 'bg-success-500/15 text-success-400 border-success-500/30',
  warning: 'bg-warning-500/15 text-warning-400 border-warning-500/30',
  danger: 'bg-danger-500/15 text-danger-400 border-danger-500/30',
  neutral: 'bg-base-700 text-ink-300 border-base-600',
};

export function Badge({ variant = 'neutral', children, className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
