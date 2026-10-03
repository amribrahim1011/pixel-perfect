import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-800 border border-base-700 text-ink-400">
        {icon ?? <Inbox size={28} />}
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-lg text-ink-100">{title}</h3>
        {description && <p className="text-sm text-ink-400 max-w-md">{description}</p>}
      </div>
      {action}
    </div>
  );
}
