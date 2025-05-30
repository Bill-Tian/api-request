'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import AutocompleteInput from '@/components/auto-complete-input';
import { RequestHeader } from '@/lib/constants';
export interface ParamType {
  key: string;
  value: string;
}

export const InputParam = ({
  isHeader = false,
  param,
  index,
  onChange,
  onDelete,
}: {
  isHeader?: boolean;
  param: ParamType;
  index: number;
  onChange?: (index: number, field: 'key' | 'value', value: string) => void;
  onDelete?: (index: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      {isHeader ? (
        <AutocompleteInput
          value={param.key}
          onChange={(value) => onChange && onChange(index, 'key', value)}
          options={RequestHeader.map((item) => item.label)}
        />
      ) : (
        <Input
          placeholder="Key"
          className="rounded-none"
          value={param.key}
          disabled={!onChange}
          onChange={(e) => onChange && onChange(index, 'key', e.target.value)}
        />
      )}
      <Input
        placeholder="Value"
        className="rounded-none"
        value={param.value}
        disabled={!onChange}
        onChange={(e) => onChange && onChange(index, 'value', e.target.value)}
      />
      <Trash
        className={cn('shrink-0 cursor-pointer ml-2', !onDelete && 'hidden')}
        size={16}
        color="#ff2e2e"
        onClick={() => onDelete && onDelete(index)}
      />
    </div>
  );
};
