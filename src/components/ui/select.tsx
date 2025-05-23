"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon } from "lucide-react";

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
        "relative flex h-8 select-none items-center rounded-[3px] pl-6 pr-6 text-[13px] leading-none text-violet-950 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-800 data-[disabled]:text-zinc-500 data-[highlighted]:text-violet-100 data-[highlighted]:outline-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { SelectItem };
