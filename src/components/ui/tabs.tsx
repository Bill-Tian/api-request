'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;
const TabsContent = TabsPrimitive.Content;

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'flex h-8 cursor-pointer select-none items-center justify-center bg-white mr-8 text-sm font-semibold leading-none text-zinc-800 outline-none hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current',
        className,
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export { Tabs, TabsList, TabsContent, TabsTrigger };
