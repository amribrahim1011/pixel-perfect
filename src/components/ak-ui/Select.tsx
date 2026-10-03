import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-ink-200">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'input-base appearance-none pr-10 cursor-pointer',
              error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/30',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-base-800 text-ink-100">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
            size={18}
          />
        </div>
        {error && <p className="text-sm text-danger-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
