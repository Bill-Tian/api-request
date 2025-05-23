"use client";
import { RequestMethod } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Info } from "lucide-react";
import { useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { SelectItem } from "./ui/select";

interface ModelPickerProps {
  // selectedModel: modelID;
  // setSelectedModel: (model: modelID) => void;
}

export const RequestSelector = ({}: ModelPickerProps) => {

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
        className="inline-flex w-[120px] h-8 items-center justify-center gap-[5px] rounded bg-[#f9fafb] px-[15px] text-[13px] leading-none text-violet-950 outline-none hover:bg-zinc-200 data-[placeholder]:text-violet-800"
        aria-label="Food"
      >
        <Select.Value/>
        <Select.Icon className="text-violet-950">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white border border-solid border-gray-200">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-950">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[2px]">
            <Select.Group>
              {RequestMethod.map(item=>{
                return  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-950">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
