'use client';
import { MethodColorMap, RequestMethod } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestData } from '@/types/tabs';
import { cn } from '@/lib/utils';
import { Loader2, Send } from 'lucide-react';

interface UrlEditorProps {
  data: RequestData;
  loading: boolean;
  onDataChange: (newData: Partial<RequestData>) => void;
  onSend: () => void;
}
export const UrlEditor = ({ data, loading, onDataChange, onSend }: UrlEditorProps) => {
  return (
    <form
      className="flex flex-row w-full my-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <Select
        value={data.method}
        defaultValue={data.method}
        onValueChange={(method) => onDataChange({ method })}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {RequestMethod.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={cn(
                'text-sm font-medium focus:text-none',
                MethodColorMap[item.value as keyof typeof MethodColorMap],
              )}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        className="w-full ml-2"
        placeholder="Enter a URL or paste a cURL command"
        value={data.url}
        onChange={(e) => onDataChange({ url: e.target.value })}
      />
      <Button className="ml-4 cursor-pointer" type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Send
      </Button>
    </form>
  );
};
