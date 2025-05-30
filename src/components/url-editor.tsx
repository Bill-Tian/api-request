'use client';
import { RequestMethod } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestData } from '@/components/count-tabs';

interface UrlEditorProps {
  data: RequestData;
  onDataChange: (newData: Partial<RequestData>) => void;
  onSend: () => void;
}
export const UrlEditor = ({ data, onDataChange, onSend }: UrlEditorProps) => {
  return (
    <div className="flex flex-row w-full my-2">
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
            <SelectItem key={item.value} value={item.value} className="text-xs">
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
      <Button className="ml-4" onClick={onSend}>
        Send
      </Button>
    </div>
  );
};
