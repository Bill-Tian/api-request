'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          'flex h-8 w-full rounded border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:font-medium placeholder:opacity-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        {...props}
      />
    </div>
  );
};
