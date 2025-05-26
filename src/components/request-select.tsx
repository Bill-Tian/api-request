"use client";
import { RequestMethod } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { ChevronDownIcon } from "lucide-react";

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
    <Select value={selectedMethod} defaultValue={defaultMethod} onValueChange={handleModelChange}>
      <SelectTrigger className="relative inline-flex w-32 h-8 border-0 border-input text-[13px] font-medium items-center gap-[5px] cursor-pointer rounded-l-sm bg-[#f9fafb] px-4 leading-none text-violet-950 outline-none data-[placeholder]:text-violet-800">
        {selectedMethod}
        <ChevronDownIcon size={16} className="absolute right-2 top-1/2 -translate-y-1/2" />
      </SelectTrigger>
      <SelectContent>
        {RequestMethod.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
