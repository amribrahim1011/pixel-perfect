import { Link as RouterLink } from '@/lib/router-compat';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

type LinkProps = ComponentProps<typeof RouterLink>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <RouterLink className={cn('transition-colors', className)} {...props}>
      {children}
    </RouterLink>
  );
}
