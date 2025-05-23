"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex h-8 select-none items-center rounded px-2 text-[12px] font-bold leading-none text-violet-950 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-400 data-[disabled]:text-zinc-500 data-[highlighted]:text-violet-100 data-[highlighted]:outline-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { SelectItem };
