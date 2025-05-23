"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

export interface ParamType {
    key: string;
    value: string;
} 

export const TabParam = ({ 
    param, 
    index,
    onChange,
    onDelete 
}: { 
    param: ParamType;
    index: number;
    onChange?: (index: number, field: 'key' | 'value', value: string) => void;
    onDelete?: (index: number) => void;
}) => {
    return (
        <div className="flex gap-2 items-center">
            <Input 
                placeholder="Key" 
                className='rounded-none' 
                value={param.key} 
                disabled={!onChange}
                onChange={(e) => onChange && onChange(index, 'key', e.target.value)}
            />
            <Input 
                placeholder="Value" 
                className='rounded-none' 
                value={param.value}
                disabled={!onChange}
                onChange={(e) => onChange && onChange(index, 'value', e.target.value)}
            />
            <Trash 
                className={cn('shrink-0 cursor-pointer', !onDelete && 'hidden')}
                size={16} 
                color='#ff2e2e'
                onClick={() => onDelete && onDelete(index)}
            />
        </div>
    );
}
