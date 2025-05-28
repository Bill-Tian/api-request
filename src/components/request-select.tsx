'use client';
import { RequestMethod } from '@/lib/constants';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ChevronDownIcon } from 'lucide-react';

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
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        {RequestMethod.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
