'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger className={cn('', className)} {...props}>
    {children}
  </SelectPrimitive.Trigger>
);

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'overflow-hidden rounded border border-solid border-[#e5e7eb] bg-popover',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'flex h-8 select-none items-center rounded px-2 text-[12px] font-bold leading-none text-violet-950 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-400 data-[disabled]:text-zinc-500 data-[highlighted]:text-violet-100 data-[highlighted]:outline-none',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectTrigger, SelectContent, SelectItem };
