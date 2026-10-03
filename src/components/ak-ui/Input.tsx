import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
 error?: string | undefined;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hint?: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ink-200">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-base',
              leftIcon ? 'pl-11' : '',
              rightIcon ? 'pr-11' : '',
              error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/30',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400">
              {rightIcon}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-sm text-danger-400">{error}</p>
        ) : hint ? (
          <p className="text-sm text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
