import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message: string;
  action?: ReactNode;
}

export function ErrorState({ title = 'Something went wrong', message, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-500/10 border border-danger-500/30 text-danger-400">
        <AlertTriangle size={28} />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-lg text-ink-100">{title}</h3>
        <p className="text-sm text-ink-400 max-w-md">{message}</p>
      </div>
      {action}
    </div>
  );
}
