'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';
import AutocompleteInput from './auto-complete-input';
import { useCallback } from 'react';

export interface InfoItem {
  key: string;
  value: string;
  contentType?: string;
  file?: File | null;
}

export interface InfoTableProps {
  showUpload?: boolean;
  list?: InfoItem[];
  inputOnChange: (index: number, field: 'key' | 'value' | 'contentType', value: string) => void;
  handleAddParam: () => void;
  handleDeleteParam: (index: number) => void;
  handleFileChange?: (index: number, file: File | null) => void;
  disabled?: boolean;
}

export const InfoTable = ({
  showUpload = false,
  list = [],
  inputOnChange,
  handleAddParam,
  handleDeleteParam,
  handleFileChange,
  disabled = false,
}: InfoTableProps) => {
  const onFileChange = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      if (!handleFileChange) return;
      const file = event.target.files?.[0] || null;
      handleFileChange(index, file);
    },
    [handleFileChange],
  );

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="border-r h-8 font-medium text-gray-500">Key</TableHead>
          <TableHead className="border-r h-8 font-medium text-gray-500">Value</TableHead>
          {showUpload && (
            <>
              <TableHead className="border-r h-8 font-medium text-gray-500">Upload</TableHead>
              <TableHead className="border-r h-8 font-medium text-gray-500">Content Type</TableHead>
            </>
          )}
          <TableHead className="border-r w-10 h-8 text-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 cursor-pointer hover:bg-transparent"
              onClick={handleAddParam}
            >
              <Plus size={16} />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((item, index) => (
          <TableRow key={index} className="hover:bg-transparent">
            <TableCell className="border-r py-1">
              <Input
                placeholder="Key"
                className="rounded-none border-none shadow-none focus-visible:ring-0 h-6 p-0 placeholder:text-muted-foreground/40"
                value={item.key}
                onChange={(e) => inputOnChange(index, 'key', e.target.value)}
                disabled={disabled}
              />
            </TableCell>
            <TableCell className="border-r py-1">
              <Input
                placeholder="Value"
                className="rounded-none border-none shadow-none focus-visible:ring-0 h-6 p-0 placeholder:text-muted-foreground/40"
                value={item.value}
                onChange={(e) => inputOnChange(index, 'value', e.target.value)}
                disabled={disabled}
              />
            </TableCell>
            {showUpload && (
              <>
                <TableCell className="border-r py-1 h-6">
                  <input
                    type="file"
                    className="h-6 cursor-pointer text-xs transition file:mr-2 file:cursor-pointer file:rounded file:bg-border file:px-4 file:py-1 file:text-secondaryLight file:transition"
                    onChange={(e) => onFileChange(index, e)}
                    disabled={disabled}
                  />
                </TableCell>
                <TableCell className="border-r py-1">
                  <AutocompleteInput
                    placeholder="Auto (Content Type)"
                    value={item.contentType || ''}
                    onChange={(value) => inputOnChange(index, 'contentType', value)}
                    options={['application/json', 'application/xml', 'text/plain']}
                  />
                </TableCell>
              </>
            )}
            <TableCell className="border-r py-1 text-center">
              {list.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 cursor-pointer hover:bg-transparent"
                  onClick={() => handleDeleteParam(index)}
                  disabled={disabled}
                >
                  <Trash2 size={16} color="#ff2e2e" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
        {list.length === 0 && (
          <TableRow>
            <TableCell colSpan={showUpload ? 5 : 3} className="text-center text-gray-500 py-4">
              NO DATA
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
