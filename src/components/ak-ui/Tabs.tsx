import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultId?: string;
  className?: string;
}

export function Tabs({ items, defaultId, className }: TabsProps) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active);
  return (
    <div className={className}>
      <div role="tablist" className="inline-flex gap-1 rounded-xl border border-base-700 bg-base-850 p-1">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active}
            onClick={() => setActive(item.id)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              item.id === active ? 'bg-base-700 text-gold-300' : 'text-ink-300 hover:text-ink-100'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-5">
        {current?.content}
      </div>
    </div>
  );
}
