"use client";
import { RequestMethod } from "@/lib/constants";
import { useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { SelectItem } from "./ui/select";


export const RequestSelector = () => {

  const defaultMethod = RequestMethod[0].value;
  const [selectedMethod, setSelectedMethod] = useState(defaultMethod);
  // If the selected model is invalid, update it to the default
  useEffect(() => {}, []);

  // Handle model change
  const handleModelChange = (value: string) => {
    setSelectedMethod(value);
  };

  return (
    <Select.Root  value={selectedMethod} defaultValue={defaultMethod} onValueChange={handleModelChange}>
      <Select.Trigger
        className="relative inline-flex w-32 h-8 border border-input text-[13px] font-medium items-center gap-[5px] cursor-pointer rounded-l-sm bg-[#f9fafb] px-4 leading-none text-violet-950 outline-none data-[placeholder]:text-violet-800"
        aria-label="Food"
      >
        <Select.Value/>
        <Select.Icon className="text-violet-950">
          <ChevronDownIcon size={16} className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white border border-solid border-gray-200">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-950">
            <ChevronUpIcon size={16} />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            <Select.Group>
              {RequestMethod.map(item=>{
                return  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-950">
            <ChevronDownIcon size={16} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
