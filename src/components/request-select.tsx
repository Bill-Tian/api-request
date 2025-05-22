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
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
        aria-label="Food"
      >
        <Select.Value/>
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              {RequestMethod.map(item=>{
                return  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
