"use client";
import { RequestMethod } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { ChevronDownIcon } from "lucide-react";

interface RequestSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RequestSelector = ({ value, onChange }: RequestSelectorProps) => {
  const defaultMethod = RequestMethod[0].value;
  const [selectedMethod, setSelectedMethod] = useState(value || defaultMethod);

  // If the selected model is invalid, update it to the default
  useEffect(() => {
    if (!value) {
      onChange(defaultMethod);
    }
  }, []);

  // Handle model change
  const handleModelChange = (newValue: string) => {
    setSelectedMethod(newValue);
    onChange(newValue);
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
