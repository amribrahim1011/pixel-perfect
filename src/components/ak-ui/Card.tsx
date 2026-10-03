import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({ hoverable, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card-surface',
        hoverable && 'card-surface-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 pt-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 pb-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
