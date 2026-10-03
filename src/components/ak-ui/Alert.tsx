import type { ReactNode } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

type Variant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: Variant;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const styles: Record<Variant, { box: string; icon: ReactNode }> = {
  info: { box: 'border-gold-700/40 bg-gold-500/5 text-gold-200', icon: <Info size={18} /> },
  success: { box: 'border-success-500/30 bg-success-500/10 text-success-400', icon: <CheckCircle2 size={18} /> },
  warning: { box: 'border-warning-500/30 bg-warning-500/10 text-warning-400', icon: <AlertTriangle size={18} /> },
  danger: { box: 'border-danger-500/30 bg-danger-500/10 text-danger-400', icon: <XCircle size={18} /> },
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const s = styles[variant];
  return (
    <div role="alert" className={cn('flex gap-3 rounded-xl border px-4 py-3', s.box, className)}>
      <span className="mt-0.5 shrink-0">{s.icon}</span>
      <div className="space-y-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-ink-300">{children}</div>}
      </div>
    </div>
  );
}
